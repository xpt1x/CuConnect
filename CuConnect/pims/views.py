from rest_framework.decorators import api_view
from rest_framework.response import Response
from .helper import create_uims_session
from .models import Post, Comment, UserProfile
from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer, UserProfileSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-likes')
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
        return Response({'error': obj})
    else:
        display_name = req.POST.get('display_name')
        full_name = obj.full_name
        

def test_view(req):
    if req.method == "GET":
        profile = UserProfile.objects.first()
        print(profile.posts.all())
