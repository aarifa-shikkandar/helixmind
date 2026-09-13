from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_FILE = BASE_DIR / "datasets" / "mc3.v0.2.8.PUBLIC.maf.gz"


print("=" * 60)
print("HELIXMIND DATASET INSPECTION")
print("=" * 60)

print("\nDataset:")
print(DATASET_FILE)


if not DATASET_FILE.exists():
    print("\nERROR: Dataset not found!")
    raise SystemExit(1)


print("\nDataset found!")
print("Reading only a small sample...")
print("Please wait...\n")


try:
    # Read only first 5000 rows
    df = pd.read_csv(
        DATASET_FILE,
        sep="\t",
        compression="gzip",
        comment="#",
        nrows=5000,
        low_memory=False
    )

except Exception as e:
    print("\nERROR while reading dataset:")
    print(e)
    raise SystemExit(1)


print("=" * 60)
print("DATASET SAMPLE INFORMATION")
print("=" * 60)

print("Rows loaded:", len(df))
print("Columns:", len(df.columns))


print("\n" + "=" * 60)
print("COLUMN NAMES")
print("=" * 60)

for number, column in enumerate(df.columns, start=1):
    print(f"{number}. {column}")


print("\n" + "=" * 60)
print("FIRST 5 ROWS")
print("=" * 60)

print(df.head())


print("\n" + "=" * 60)
print("SAMPLE READ SUCCESSFUL")
print("=" * 60)