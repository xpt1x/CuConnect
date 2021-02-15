from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, UserProfileViewSet

router = routers.DefaultRouter()
router.register("posts", PostViewSet)
router.register("comments", CommentViewSet)
router.register("profiles", UserProfileViewSet)

urlpatterns = [
    path("validate", views.validate),
    path("test", views.test_view),
    path("register", views.register_user),
    path("attendance", views.get_minimal_attendance),
    path("fullattendance", views.get_full_attendance),
    path("timetable", views.get_timetable),
    path("", include(router.urls)),
]
