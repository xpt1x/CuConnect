from requests.api import post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .helper import create_uims_session
from .models import Post, Comment, UserProfile
from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer, UserProfileSerializer
from uims_api.exceptions import UIMSInternalError


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter().order_by("-timestamp", "-likes")
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


@api_view(["GET"])
def get_user_posts(req, uid):
    posts = Post.objects.filter(author=uid).order_by("-timestamp")
    return Response(
        {"posts": PostSerializer(posts, many=True, context={"request": req}).data}
    )


@api_view(http_method_names=["POST"])
def check_user(req):
    user_exists = (
        True
        if UserProfile.objects.filter(user_id=req.POST.get("uid").upper()).exists()
        else False
    )
    status, obj = create_uims_session(req)
    if status == -1:
        return Response({"exists": user_exists, "full_name": None, "error": obj})
    else:
        return Response({"exists": user_exists, "full_name": obj.full_name})


@api_view(http_method_names=["POST"])
def validate(req):
    status, obj = create_uims_session(req)
    if status == -1:
        return Response({"error": obj})
    else:
        return Response({"full_name": obj.full_name})


@api_view(http_method_names=["POST"])
def register_user(req):
    status, obj = create_uims_session(req)
    if status == -1:
        return Response({"error": obj})
    else:
        display_name = (req.POST.get("display_name")).lower().split(" ")
        full_name = obj.full_name
        f_name = full_name.lower().split(" ")
        for word in display_name:
            if not word in f_name:
                return Response(
                    {"error": f"Words in display name not in {full_name.upper()}"}
                )
        if UserProfile.objects.filter(user_id=req.POST.get("uid").upper()).exists():
            return Response({"error": "UID already registered"})
        user = UserProfile(
            user_id=req.POST.get("uid").upper(),
            display_name=(req.POST.get("display_name").lower().title()),
        )
        user.save()
        return Response({"success": "User created successfully!"})


@api_view(http_method_names=["POST"])
def get_minimal_attendance(request):
    status, obj = create_uims_session(request)
    if status == -1:
        return Response({"error": obj})
    else:
        try:
            subjects = obj.attendance
        except Exception as e:
            if e.__class__ == UIMSInternalError:
                return Response({"error": "UIMS Internal Failure"})
            else:
                return Response({"error": "Looks like this Module is inactive on UIMS"})
        else:
            return Response({"attendance": subjects})


@api_view(http_method_names=["POST"])
def get_full_attendance(request):
    status, obj = create_uims_session(request)
    if status == -1:
        return Response({"error": obj})
    try:
        subjects = obj.full_attendance
    except Exception as e:
        if e.__class__ == UIMSInternalError:
            return Response({"error": "UIMS Internal Failure"})
        else:
            return Response({"error": "Looks like this Module is inactive on UIMS"})
    else:
        return Response({"fullattendance": subjects})


@api_view(http_method_names=["POST"])
def get_timetable(request):
    status, obj = create_uims_session(request)
    if status == -1:
        return Response({"error": obj})
    try:
        timetable = obj.timetable
    except Exception as e:
        if e.__class__ == UIMSInternalError:
            return Response({"error": "UIMS Internal Failure"})
        else:
            return Response({"error": "Looks like this Module is inactive on UIMS"})
    else:
        return Response({"timetable": timetable})


@api_view(http_method_names=["POST"])
def get_marks(request, session):
    status, obj = create_uims_session(request)
    if status == -1:
        return Response({"error": obj})
    try:
        marks = obj.marks(session=session)
    except Exception as e:
        if e.__class__ == UIMSInternalError:
            return Response({"error": "UIMS Internal Failure"})
        else:
            return Response({"error": "Looks like this Module is inactive on UIMS"})
    else:
        return Response({"marks": marks})


@api_view(http_method_names=["POST"])
def get_available_sessions(request):
    status, obj = create_uims_session(request)
    if status == -1:
        return Response({"error": obj})
    try:
        available_sessions = obj.available_sessions
    except Exception as e:
        if e.__class__ == UIMSInternalError:
            return Response({"error": "UIMS Internal Failure"})
        else:
            return Response({"error": "Looks like this Module is inactive on UIMS"})
    else:
        return Response({"sessions": available_sessions})
