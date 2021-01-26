from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, UserProfileViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('comments', CommentViewSet)
router.register('profiles', UserProfileViewSet)

urlpatterns = [
    path("validate", views.validate),
    path("test", views.test_view),
    path("register", views.register_user),
    path('', include(router.urls))
]

