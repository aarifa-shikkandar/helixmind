from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import gzip
import io

from app.predict import predict_cancer


# =========================================================
# HELIXMIND FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="HelixMind DNA Precision Intelligence System",
    version="1.0.0",
    description="AI-powered DNA analysis and health risk intelligence system"
)


# =========================================================
# CORS CONFIGURATION
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://helixmind-frontend-n9eb.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.get("/")
def root():
    return {
        "message": "HelixMind API is running",
        "status": "success"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =========================================================
# MANUAL DNA PREDICTION
# =========================================================

class DNAInput(BaseModel):
    genes: Dict[str, int]


@app.post("/predict")
def predict(data: DNAInput):

    try:

        result = predict_cancer(data.genes)

        return {
            "status": "success",
            "prediction": result["prediction"],
            "probabilities": result["probabilities"]
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =========================================================
# GENOMIC FILE ANALYSIS
# =========================================================

@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):

    filename = file.filename or ""

    # -----------------------------------------------------
    # Check file extension
    # -----------------------------------------------------

    if not filename.lower().endswith(".gz"):

        raise HTTPException(
            status_code=400,
            detail="Please upload a .gz genomic file."
        )

    try:

        # -------------------------------------------------
        # Read uploaded file
        # -------------------------------------------------

        contents = await file.read()

        # -------------------------------------------------
        # Open gzip file
        # -------------------------------------------------

        with gzip.open(
            io.BytesIO(contents),
            mode="rt",
            encoding="utf-8",
            errors="ignore"
        ) as f:

            # ---------------------------------------------
            # Read header
            # ---------------------------------------------

            header_line = f.readline()

            if not header_line:

                raise HTTPException(
                    status_code=400,
                    detail="Empty genomic file."
                )

            # Remove BOM and whitespace

            header_line = header_line.lstrip("\ufeff").strip()

            # MAF uses TAB separation

            headers = header_line.split("\t")

            # ---------------------------------------------
            # Find Hugo_Symbol column
            # ---------------------------------------------

            gene_index = None

            for i, column in enumerate(headers):

                column = column.strip()

                if column == "Hugo_Symbol":

                    gene_index = i
                    break

            if gene_index is None:

                raise HTTPException(
                    status_code=400,
                    detail="Hugo_Symbol column was not found."
                )

            # ---------------------------------------------
            # Extract genes
            # ---------------------------------------------

            genes_found = set()

            for line in f:

                line = line.strip()

                if not line:
                    continue

                values = line.split("\t")

                if len(values) <= gene_index:
                    continue

                gene = values[gene_index].strip()

                if gene and gene != ".":
                    genes_found.add(gene)

        # -------------------------------------------------
        # Convert genes into model input
        # -------------------------------------------------

        gene_data = {
            gene: 1
            for gene in genes_found
        }

        # -------------------------------------------------
        # Prediction
        # -------------------------------------------------

        result = predict_cancer(gene_data)

        # -------------------------------------------------
        # Return result
        # -------------------------------------------------

        return {
            "status": "success",
            "filename": filename,
            "mutations_found": len(genes_found),
            "genes_found": sorted(list(genes_found)),
            "prediction": result["prediction"],
            "probabilities": result["probabilities"]
        }

    except HTTPException:

        raise

    except gzip.BadGzipFile:

        raise HTTPException(
            status_code=400,
            detail="Invalid gzip genomic file."
        )

    except Exception as e:

        print("FILE ANALYSIS ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"File analysis failed: {str(e)}"
        )