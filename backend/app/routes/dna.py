from app.services.feature_extractor import extract_features
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(
    prefix="/api/dna",
    tags=["DNA Analysis"]
)


class DNARequest(BaseModel):
    sequence: str = Field(
        ...,
        min_length=1,
        description="DNA sequence containing A, T, C and G"
    )


@router.post("/validate")
def validate_dna(data: DNARequest):

    sequence = data.sequence.upper().replace(" ", "").replace("\n", "")

    valid_bases = set("ATCG")

    invalid_bases = sorted(set(sequence) - valid_bases)

    if invalid_bases:
        return {
            "valid": False,
            "message": "Invalid DNA sequence",
            "invalid_bases": invalid_bases
        }

    return {
        "valid": True,
        "message": "DNA sequence is valid",
        "length": len(sequence)
    }


@router.post("/analyze")
def analyze_dna(data: DNARequest):

    sequence = data.sequence.upper().replace(" ", "").replace("\n", "")

    valid_bases = set("ATCG")
    invalid_bases = sorted(set(sequence) - valid_bases)

    if invalid_bases:
        return {
            "success": False,
            "message": "Invalid DNA sequence",
            "invalid_bases": invalid_bases
        }

    length = len(sequence)

    return {
        "success": True,
        "message": "DNA sequence analyzed successfully",
        "sequence_length": length,
        "A_count": sequence.count("A"),
        "T_count": sequence.count("T"),
        "C_count": sequence.count("C"),
        "G_count": sequence.count("G")
    }
@router.post("/features")
def get_dna_features(data: DNARequest):

    sequence = data.sequence.upper().replace(" ", "").replace("\n", "")

    valid_bases = set("ATCG")
    invalid_bases = sorted(set(sequence) - valid_bases)

    if invalid_bases:
        return {
            "success": False,
            "message": "Invalid DNA sequence",
            "invalid_bases": invalid_bases
        }

    features = extract_features(sequence)

    return {
        "success": True,
        "message": "DNA features extracted successfully",
        "features": features
    }