from rest_framework import serializers
from .models import Post, Comment, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "user_id",
            "display_name",
            "picture",
            "rep",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author_data = serializers.SerializerMethodField()

    def get_author_data(self, data):
        serializer = UserProfileSerializer(data.author)
        return serializer.data

    class Meta:
        model = Comment
        fields = ["id", "msg", "author", "author_data", "post"]


class PostSerializer(serializers.ModelSerializer):

    author_data = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    def get_author_data(self, data):
        serializer = UserProfileSerializer(data.author)
        return serializer.data

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "author",
            "author_data",
            "likes",
            "image",
            "comments",
            "timestamp",
        ]
