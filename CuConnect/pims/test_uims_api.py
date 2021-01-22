from uims_api import SessionUIMS
import os

new_acc = SessionUIMS(os.getenv('UIMS_UID'), os.getenv('UIMS_PASS'))
print(new_acc.attendance)