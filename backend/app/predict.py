from pathlib import Path
import joblib
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "helixmind_model.pkl"
)

DATASET_PATH = (
    BASE_DIR
    / "ml"
    / "datasets"
    / "helixmind_ml_dataset.csv"
)


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading HelixMind model...")

model = joblib.load(MODEL_PATH)


# ============================================================
# LOAD ORIGINAL TRAINING FEATURES
# ============================================================

print("Loading feature structure...")

dataset_columns = pd.read_csv(
    DATASET_PATH,
    nrows=0
).columns.tolist()


# Remove non-feature columns

training_features = [
    column
    for column in dataset_columns
    if column not in [
        "Tumor_Sample_Barcode",
        "Cancer_Type"
    ]
]


print(
    "Expected features:",
    len(training_features)
)


# ============================================================
# PREDICTION FUNCTION
# ============================================================

def predict_cancer(gene_data: dict):

    # Create dataframe with ALL 8314 training features
    # Initially every gene is 0

    input_data = pd.DataFrame(
        0,
        index=[0],
        columns=training_features
    )


    # Add received gene values

    for gene, value in gene_data.items():

        if gene in input_data.columns:

            input_data.loc[0, gene] = value


    # ========================================================
    # MODEL PREDICTION
    # ========================================================

    prediction = model.predict(
        input_data
    )[0]


    # ========================================================
    # PROBABILITIES
    # ========================================================

    probabilities = model.predict_proba(
        input_data
    )[0]


    classes = model.classes_


    probability_data = {}

    for cancer, probability in zip(
        classes,
        probabilities
    ):

        probability_data[cancer] = round(
            float(probability) * 100,
            2
        )


    return {
        "prediction": prediction,
        "probabilities": probability_data
    }