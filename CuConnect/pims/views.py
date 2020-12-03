from uims_api import SessionUIMS
from uims_api.exceptions import IncorrectCredentialsError, UIMSInternalError
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(http_method_names=['POST'])
def Validate(req):
    if not req.POST['uid']:
        return Response({'error': 'No UIMS Uid'})
    if not req.POST['password']:
        return Response({'error': 'No UIMS Password'})

    try:
        SessionUIMS(req.POST['uid'], req.POST['password'])
    except Exception as e:
        if e.__class__ == IncorrectCredentialsError:
            return Response({'error': 'Invalid credentials'})
        else:
            return Response({'error': 'Looks like this Module is inactive on UIMS'})
    else:
        return Response({'success': True})