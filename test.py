import requests
import os

response = requests.post(
    "http://127.0.0.1:8000/pims/validate",
    data={
        "uid": os.getenv("UIMS_UID"),
        "password": os.getenv("UIMS_PASS") or os.getenv("UIMS_PASSWORD"),
    },
)

print(response.text)
