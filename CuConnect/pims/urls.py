from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, UserProfileViewSet, get_marks

router = routers.DefaultRouter()
router.register("posts", PostViewSet)
router.register("comments", CommentViewSet)
router.register("profiles", UserProfileViewSet)

urlpatterns = [
    path("validate", views.validate),
    path("register", views.register_user),
    path("attendance", views.get_minimal_attendance),
    path("fullattendance", views.get_full_attendance),
    path("timetable", views.get_timetable),
    path("marks/<str:session>", views.get_marks),
    path("availablesessions", views.get_available_sessions),
    path("", include(router.urls)),
]
