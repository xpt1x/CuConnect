from rest_framework import serializers
from .models import Post, Comment, UserProfile


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "url",
            "title",
            "author",
            "likes",
            "image",
            "timestamp",
            "comments",
        ]


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "url", "msg", "timestamp", "author", "post"]


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "url", "display_name", "user_id", "posts", "rep"]
