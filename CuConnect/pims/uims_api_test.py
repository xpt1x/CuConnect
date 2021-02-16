from uims_api import SessionUIMS
import os

new_acc = SessionUIMS(os.getenv("UIMS_UID"), os.getenv("UIMS_PASS"))
# with open("marks.json", "w") as file:
#     file.write(new_acc.marks)