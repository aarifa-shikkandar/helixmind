from pathlib import Path
import gzip
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MAF_FILE = BASE_DIR / "datasets" / "mc3.v0.2.8.PUBLIC.maf.gz"

MAPPING_FILE = BASE_DIR / "datasets" / "sample_cancer_mapping.csv"

OUTPUT_FILE = BASE_DIR / "datasets" / "helixmind_ml_dataset.csv"


# ============================================================
# SETTINGS
# ============================================================

MAX_ROWS = 100000


print("=" * 60)
print("HELIXMIND - DATA PREPROCESSING")
print("=" * 60)


# ============================================================
# CHECK FILES
# ============================================================

if not MAF_FILE.exists():
    print("\nERROR: MAF dataset not found!")
    raise SystemExit(1)


if not MAPPING_FILE.exists():
    print("\nERROR: sample_cancer_mapping.csv not found!")
    print(MAPPING_FILE)
    raise SystemExit(1)


print("\nRequired files found!")


# ============================================================
# LOAD MAPPING
# ============================================================

print("\nLoading cancer mapping...")

mapping_df = pd.read_csv(
    MAPPING_FILE
)

print(
    "Mapped samples:",
    len(mapping_df)
)


# ============================================================
# READ MAF IN CHUNKS
# ============================================================

print("\nReading mutation data in chunks...")
print("This prevents memory problems.")


sample_gene_data = []


reader = pd.read_csv(
    MAF_FILE,
    sep="\t",
    compression="gzip",
    comment="#",
    usecols=[
        "Hugo_Symbol",
        "Tumor_Sample_Barcode",
        "Variant_Classification"
    ],
    chunksize=10000,
    low_memory=False
)


rows_processed = 0


for chunk in reader:

    rows_processed += len(chunk)

    print(
        f"Processed rows: {rows_processed}"
    )


    # Remove missing genes
    chunk = chunk.dropna(
        subset=[
            "Hugo_Symbol",
            "Tumor_Sample_Barcode"
        ]
    )


    # Keep important mutation classifications
    valid_classes = [
        "Missense_Mutation",
        "Nonsense_Mutation",
        "Frame_Shift_Del",
        "Frame_Shift_Ins",
        "Splice_Site",
        "In_Frame_Del",
        "In_Frame_Ins",
        "Nonstop_Mutation",
        "Translation_Start_Site"
    ]


    chunk = chunk[
        chunk["Variant_Classification"].isin(
            valid_classes
        )
    ]


    # Keep only samples that have metadata
    chunk = chunk[
        chunk["Tumor_Sample_Barcode"].isin(
            mapping_df["Tumor_Sample_Barcode"]
        )
    ]


    if not chunk.empty:

        sample_gene_data.append(
            chunk[
                [
                    "Tumor_Sample_Barcode",
                    "Hugo_Symbol"
                ]
            ]
        )


    if rows_processed >= MAX_ROWS:
        print(
            "\nDemo preprocessing limit reached."
        )
        break


# ============================================================
# COMBINE
# ============================================================

if not sample_gene_data:

    print("\nERROR: No matching mutation data found.")

    raise SystemExit(1)


mutation_df = pd.concat(
    sample_gene_data,
    ignore_index=True
)


print(
    "\nMatching mutation rows:",
    len(mutation_df)
)


# ============================================================
# REMOVE DUPLICATES
# ============================================================

mutation_df = mutation_df.drop_duplicates()


# ============================================================
# CREATE SAMPLE × GENE MATRIX
# ============================================================

print("\nCreating sample-gene feature matrix...")


mutation_df["value"] = 1


feature_df = mutation_df.pivot_table(
    index="Tumor_Sample_Barcode",
    columns="Hugo_Symbol",
    values="value",
    aggfunc="max",
    fill_value=0
)


feature_df = feature_df.reset_index()


# ============================================================
# ADD CANCER LABEL
# ============================================================

print("\nAdding cancer labels...")


feature_df = feature_df.merge(
    mapping_df[
        [
            "Tumor_Sample_Barcode",
            "Project_ID"
        ]
    ],
    on="Tumor_Sample_Barcode",
    how="inner"
)


# Rename label
feature_df = feature_df.rename(
    columns={
        "Project_ID": "Cancer_Type"
    }
)


# ============================================================
# SAVE
# ============================================================

feature_df.to_csv(
    OUTPUT_FILE,
    index=False
)


print("\n" + "=" * 60)
print("PREPROCESSING COMPLETE")
print("=" * 60)


print(
    "\nFinal samples:",
    len(feature_df)
)


print(
    "Final features:",
    len(feature_df.columns)
)


print("\nCancer distribution:")

print(
    feature_df["Cancer_Type"].value_counts()
)


print("\nSaved dataset:")

print(OUTPUT_FILE)


print("\nDone!")