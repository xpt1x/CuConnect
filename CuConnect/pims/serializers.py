from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.HyperlinkedModelSerializer):
    #comment = serializers.CharField(source='comment.msg')

    class Meta:
        model = Post
        fields = ['id', 'url', 'title', 'likes', 'image', 'comments']


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['post', 'msg']
