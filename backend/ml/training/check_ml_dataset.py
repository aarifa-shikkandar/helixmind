from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_FILE = (
    BASE_DIR
    / "datasets"
    / "helixmind_ml_dataset.csv"
)


print("=" * 60)
print("HELIXMIND ML DATASET CHECK")
print("=" * 60)


if not DATASET_FILE.exists():

    print("\nERROR: Dataset not found!")
    print(DATASET_FILE)

    raise SystemExit(1)


print("\nDataset found!")


df = pd.read_csv(DATASET_FILE)


print("\nRows:", df.shape[0])
print("Columns:", df.shape[1])


print("\nFirst 5 rows:")
print(df.head())


print("\nCancer types:")
print(df["Cancer_Type"].value_counts())


print("\nMissing values:")

missing = df.isnull().sum()

print(
    missing[missing > 0]
)


print("\nDuplicate rows:", df.duplicated().sum())


print("\n" + "=" * 60)
print("DATASET CHECK COMPLETE")
print("=" * 60)