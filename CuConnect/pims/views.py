from rest_framework.decorators import api_view
from rest_framework.response import Response
from .helper import create_uims_session
from .models import Post, Comment, UserProfile
from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer, UserProfileSerializer
from uims_api.exceptions import UIMSInternalError


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by("-likes")
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


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
        if UserProfile.objects.filter(user_id=req.POST.get("uid")).exists():
            return Response({"error": "UID already registered"})
        user = UserProfile(
            user_id=req.POST.get("uid"),
            display_name=(req.POST.get("display_name").lower().capitalize()),
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
            return Response(subjects)


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
        return Response(subjects)


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
        return Response(timetable)


def test_view(req):
    if req.method == "GET":
        profile = UserProfile.objects.first()
        print(profile.posts.all())
