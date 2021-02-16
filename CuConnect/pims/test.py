from uims_api import SessionUIMS
import os

acc = SessionUIMS(os.getenv("UIMS_UID"), os.getenv("UIMS_PASS"))
print(acc.marks)