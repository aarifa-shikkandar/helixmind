```python
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class DNAInput(BaseModel):
    gene: str
    mutation: str


@router.post("/analyze")
def analyze_dna(data: DNAInput):
    return {
        "status": "success",
        "gene": data.gene,
        "mutation": data.mutation,
        "message": "DNA analysis received successfully"
    }
```
