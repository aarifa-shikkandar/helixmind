from pathlib import Path
import gzip
import requests
import pandas as pd
import json
import time


BASE_DIR = Path(__file__).resolve().parent.parent

MAF_FILE = BASE_DIR / "datasets" / "mc3.v0.2.8.PUBLIC.maf.gz"

OUTPUT_FILE = BASE_DIR / "datasets" / "sample_cancer_mapping.csv"

GDC_URL = "https://api.gdc.cancer.gov/cases"

MAX_SAMPLES = 100


print("=" * 60)
print("HELIXMIND - SAMPLE TO CANCER MAPPING")
print("=" * 60)


# ------------------------------------------------------------
# Check MAF file
# ------------------------------------------------------------

if not MAF_FILE.exists():
    print("\nERROR: MAF file not found!")
    print(MAF_FILE)
    raise SystemExit(1)


print("\nMAF file found!")


# ------------------------------------------------------------
# Get unique sample barcodes
# ------------------------------------------------------------

print("\nReading sample barcodes...")
print("Please wait...")


sample_barcodes = set()


with gzip.open(
    MAF_FILE,
    "rt",
    errors="replace"
) as file:

    header = None

    for line in file:

        if line.startswith("#"):
            continue

        header = line.rstrip("\n").split("\t")
        break


    tumor_index = header.index(
        "Tumor_Sample_Barcode"
    )


    for line in file:

        parts = line.rstrip("\n").split("\t")

        if len(parts) <= tumor_index:
            continue

        barcode = parts[tumor_index].strip()

        if barcode.startswith("TCGA-"):
            sample_barcodes.add(barcode)

        if len(sample_barcodes) >= MAX_SAMPLES:
            break


print(
    "\nUnique samples collected:",
    len(sample_barcodes)
)


# ------------------------------------------------------------
# Convert sample barcode → TCGA case ID
# ------------------------------------------------------------

print("\nConnecting samples to GDC cases...")
print("Please wait...\n")


results = []


for number, barcode in enumerate(
    sorted(sample_barcodes),
    start=1
):

    # Example:
    # TCGA-02-0003-01A-01D-1490-08
    #
    # becomes:
    # TCGA-02-0003

    case_id = "-".join(
        barcode.split("-")[:3]
    )


    filters = {
        "op": "in",
        "content": {
            "field": "submitter_id",
            "value": [case_id]
        }
    }


    params = {
        "filters": json.dumps(filters),
        "fields": (
            "submitter_id,"
            "project.project_id,"
            "disease_type"
        ),
        "format": "JSON",
        "size": 1
    }


    try:

        response = requests.get(
            GDC_URL,
            params=params,
            timeout=30
        )


        if response.status_code != 200:

            print(
                f"{number}/{len(sample_barcodes)} "
                f"API ERROR {response.status_code}: "
                f"{barcode}"
            )

            continue


        data = response.json()


        hits = (
            data
            .get("data", {})
            .get("hits", [])
        )


        if not hits:

            print(
                f"{number}/{len(sample_barcodes)} "
                f"No case found: {case_id}"
            )

            continue


        case = hits[0]

        project = case.get(
            "project",
            {}
        )


        project_id = project.get(
            "project_id"
        )


        disease_type = case.get(
            "disease_type"
        )


        results.append({

            "Tumor_Sample_Barcode":
                barcode,

            "Case_ID":
                case.get("submitter_id"),

            "Project_ID":
                project_id,

            "Disease_Type":
                disease_type
        })


        print(
            f"{number}/{len(sample_barcodes)} "
            f"{barcode} -> {project_id}"
        )


    except Exception as error:

        print(
            f"{number}/{len(sample_barcodes)} "
            f"ERROR: {error}"
        )


    time.sleep(0.1)


# ------------------------------------------------------------
# Save mapping
# ------------------------------------------------------------

if not results:

    print("\nNo mapping data collected.")

    raise SystemExit(1)


mapping_df = pd.DataFrame(results)


mapping_df = mapping_df.drop_duplicates(
    subset=["Tumor_Sample_Barcode"]
)


mapping_df.to_csv(
    OUTPUT_FILE,
    index=False
)


# ------------------------------------------------------------
# Summary
# ------------------------------------------------------------

print("\n" + "=" * 60)
print("MAPPING SUCCESSFUL")
print("=" * 60)


print(
    "\nSamples mapped:",
    len(mapping_df)
)


print("\nCancer project distribution:")

print(
    mapping_df["Project_ID"]
    .value_counts()
)


print("\nSaved file:")

print(OUTPUT_FILE)


print("\nDone!")