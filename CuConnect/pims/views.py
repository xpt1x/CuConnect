from rest_framework.decorators import api_view
from rest_framework.response import Response
from helper import create_uims_session


@api_view(http_method_names=["POST"])
def Validate(req):
    status, obj = create_uims_session(req)
    if status == -1:
        return Response({"error": obj})
    else:
        return Response({"success": True})


@api_view(http_method_names=["POST"])
def get_full_name(req):
    status, obj = create_uims_session(req)
    if status == -1:
        return Response({"error": obj})
    else:
        return Response({"full_name": obj.full_name})
