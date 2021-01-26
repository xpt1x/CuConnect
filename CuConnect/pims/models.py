from django.db import models
from django.contrib.auth.models import User


def upload_post_image(self, filename, **kwargs):
    return f'images/posts/{str(self.title)}-{filename}'

def upload_profile_image(self, filename, **kwargs):
    return f'images/profiles/{str(self.user_id)}-{filename}'



class Post(models.Model):
    title = models.CharField(max_length=128, blank=False, null=False)
    author = models.ForeignKey('UserProfile', on_delete=models.CASCADE, related_name="posts")
    likes = models.IntegerField(default=0, blank=False, null=False)
    image = models.ImageField(upload_to=upload_post_image, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    msg = models.CharField(max_length=64, blank=False, null=False)
    author = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f'{self.msg} -{self.author}'
        
class UserProfile(models.Model):
    user_id = models.CharField(max_length=10, blank=False, null=False)
    display_name = models.CharField(max_length=32, blank=False, null=False)   
    picture = models.ImageField(upload_to=upload_profile_image, blank=True, null=True)

    def __str__(self):
        return self.display_name



    