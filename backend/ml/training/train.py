from pathlib import Path

import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import joblib


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_FILE = (
    BASE_DIR
    / "datasets"
    / "helixmind_ml_dataset.csv"
)

MODEL_FILE = (
    BASE_DIR
    / "models"
    / "helixmind_model.pkl"
)


# ============================================================
# LOAD DATASET
# ============================================================

print("=" * 60)
print("HELIXMIND MODEL TRAINING")
print("=" * 60)

print("\nLoading dataset...")

df = pd.read_csv(DATASET_FILE)

print("Rows:", df.shape[0])
print("Columns:", df.shape[1])


# ============================================================
# PREPARE X AND Y
# ============================================================

X = df.drop(
    columns=[
        "Tumor_Sample_Barcode",
        "Cancer_Type"
    ]
)

y = df["Cancer_Type"]


print("\nFeatures:", X.shape[1])
print("Samples:", X.shape[0])


# ============================================================
# TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# ============================================================
# MODEL PIPELINE
# ============================================================

print("\nCreating ML pipeline...")


model = Pipeline(
    steps=[
        (
            "feature_selection",
            SelectKBest(
                score_func=chi2,
                k=min(500, X_train.shape[1])
            )
        ),

        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42,
                class_weight="balanced"
            )
        )
    ]
)


# ============================================================
# TRAIN
# ============================================================

print("\nTraining Random Forest...")
print("Please wait...")


model.fit(
    X_train,
    y_train
)


print("\nTraining completed!")
# Get selected feature names
selector = model.named_steps["feature_selection"]

selected_features = X_train.columns[
    selector.get_support()
]

FEATURE_FILE = (
    BASE_DIR
    / "models"
    / "selected_features.txt"
)

with open(
    FEATURE_FILE,
    "w"
) as file:

    for feature in selected_features:
        file.write(
            feature + "\n"
        )

print("\nSelected features saved:")
print(FEATURE_FILE)

print(
    "Number of selected features:",
    len(selected_features)
)

# ============================================================
# PREDICTION
# ============================================================

print("\nEvaluating model...")


y_pred = model.predict(X_test)


accuracy = accuracy_score(
    y_test,
    y_pred
)


print("\n" + "=" * 60)
print("MODEL RESULTS")
print("=" * 60)

print(
    f"\nAccuracy: {accuracy * 100:.2f}%"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ============================================================
# SAVE MODEL
# ============================================================

MODEL_FILE.parent.mkdir(
    parents=True,
    exist_ok=True
)


joblib.dump(
    model,
    MODEL_FILE
)


print("\n" + "=" * 60)
print("MODEL SAVED")
print("=" * 60)

print("\nModel location:")
print(MODEL_FILE)

print("\nTraining complete!")