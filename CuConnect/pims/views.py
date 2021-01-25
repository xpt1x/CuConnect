from rest_framework.decorators import api_view
from rest_framework.response import Response
from .helper import create_uims_session
from .models import Post, Comment
from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


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


@api_view(http_method_names=["GET"])
def get_post_comments(req):
    posts = Post.objects.filter(title="xyz")
    comments = []
    for post in posts:
        comments.append(post.comments.all())
    print(comments)
    return Response({'comments': True})
