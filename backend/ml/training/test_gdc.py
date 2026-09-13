import requests
import json


case_id = "TCGA-02-0003"

url = "https://api.gdc.cancer.gov/cases"


filters = {
    "op": "in",
    "content": {
        "field": "submitter_id",
        "value": [case_id]
    }
}


params = {
    "filters": json.dumps(filters),
    "fields": "submitter_id,project.project_id,disease_type",
    "format": "JSON",
    "size": 1
}


response = requests.get(
    url,
    params=params,
    timeout=30
)


print("Status:", response.status_code)

print("\nGDC RESPONSE:")

try:
    print(
        json.dumps(
            response.json(),
            indent=2
        )
    )

except Exception:
    print(response.text)