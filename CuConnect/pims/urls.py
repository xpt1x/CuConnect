from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PostViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('comments', CommentViewSet)

urlpatterns = [
    path("validate", views.Validate),
    path("get_full_name", views.get_full_name),
    path("get_posts", views.get_post_comments),
    path('', include(router.urls))
]
