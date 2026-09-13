from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_FILE = BASE_DIR / "datasets" / "mc3.v0.2.8.PUBLIC.maf.gz"


df = pd.read_csv(
    DATASET_FILE,
    sep="\t",
    compression="gzip",
    comment="#",
    nrows=5000,
    low_memory=False
)


print("\n===== SAMPLE IDENTIFIERS =====")

print("\nTumor Sample Barcodes:")
print(df["Tumor_Sample_Barcode"].head(20).to_string(index=False))


print("\n===== VARIANT TYPES =====")

print(df["Variant_Type"].value_counts().head(20))


print("\n===== VARIANT CLASSIFICATIONS =====")

print(
    df["Variant_Classification"]
    .value_counts()
    .head(20)
)


print("\n===== MUTATION STATUS =====")

print(
    df["Mutation_Status"]
    .value_counts(dropna=False)
)


print("\n===== GENES =====")

print(
    df["Hugo_Symbol"]
    .value_counts()
    .head(20)
)