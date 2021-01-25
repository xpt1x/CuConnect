from django.db import models
from django.contrib.auth.models import User


def upload_image(self, filename, **kwargs):
    return f'images/{str(self.title)}-{filename}'


class Post(models.Model):
    title = models.CharField(max_length=128, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0, blank=False, null=False)
    image = models.ImageField(upload_to=upload_image, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    msg = models.CharField(max_length=64, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f'{self.msg} -{self.author}'
