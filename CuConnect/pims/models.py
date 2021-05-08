from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from . import config


def upload_post_image(self, filename, **kwargs):
    return f"images/posts/{str(self.title)}-{filename}"


def upload_profile_image(self, filename, **kwargs):
    return f"images/profiles/{str(self.user_id)}-{filename}"


class Post(models.Model):
    title = models.CharField(max_length=128, blank=True, null=True)
    author = models.ForeignKey(
        "UserProfile", on_delete=models.CASCADE, related_name="posts"
    )
    image = models.ImageField(upload_to=upload_post_image, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    likes = models.IntegerField(default=0, blank=False, null=False)
    reports = models.IntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    msg = models.CharField(max_length=64, blank=False, null=False)
    author = models.ForeignKey("UserProfile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"{self.msg} - {self.author}"


class UserProfile(models.Model):
    user_id = models.CharField(max_length=10, blank=False, null=False, primary_key=True)
    display_name = models.CharField(max_length=32, blank=False, null=False)
    picture = models.ImageField(upload_to=upload_profile_image, blank=True, null=True)
    rep = models.FloatField(default=0.0, blank=False, null=False)

    def __str__(self):
        return self.display_name


@receiver(post_save, sender=Post)
def increase_user_rep_on_post_create(
    sender, update_fields, instance, created, **kwargs
):
    if created:
        instance.author.rep += config.NEW_POST_REP
        instance.author.save()


@receiver(pre_save, sender=Post)
def change_user_rep_on_like(sender, instance: Post, **kwargs):
    if instance.id is None:  # new object will be created
        pass
    else:
        previous = Post.objects.get(id=instance.id)
        if previous.likes != instance.likes:  # field will be updated
            # sign can be 1 or -1
            sign = instance.likes - previous.likes
            instance.author.rep += sign * config.NEW_LIKE_REPs
            instance.author.save()
