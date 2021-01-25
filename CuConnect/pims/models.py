from django.db import models
from django.contrib.auth.models import User


def upload_image(self, filename, **kwargs):
    return f'images/{str(self.name)}-{filename}'


class Comment(models.Model):
    msg = models.CharField(max_length=64, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)


class Post(models.Model):
    title = models.CharField(max_length=128, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ManyToManyField(Comment)
    likes = models.IntegerField(default=0, blank=False, null=False)
    image = models.ImageField(upload_to=upload_image, blank=False, null=False,)
# class Profile(models.Model):
#     username = models.ForeignKey()
