from uims_api import SessionUIMS
from uims_api.exceptions import IncorrectCredentialsError


def create_uims_session(req):
    """
    Creates a new UIMS session
    @param request
    :Return status 1 or -1, object (error/SessionObject)
    """
    if not req.POST["uid"]:
        return (-1, "No UID Provided")
    if not req.POST["password"]:
        return (-1, "No Password Provided")
    else:
        try:
            new_acc = SessionUIMS(req.POST["uid"], req.POST["password"])
        except Exception as e:
            if e.__class__ == IncorrectCredentialsError:
                return (-1, "Incorrect Credentials")
            else:
                return (-1, "Looks like this Module is inactive on UIMS")
        else:
            return (1, new_acc)