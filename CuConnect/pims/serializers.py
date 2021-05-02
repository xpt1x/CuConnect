from rest_framework import serializers
from .models import Post, Comment, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["user_id", "display_name", "picture", "rep", "posts"]


class CommentSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "msg", "author"]


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author = UserProfileSerializer()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "author",
            "likes",
            "image",
            "comments",
            "timestamp",
        ]
