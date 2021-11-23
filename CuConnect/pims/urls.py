from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("posts", views.PostViewSet)
router.register("comments", views.CommentViewSet)
router.register("profiles", views.UserProfileViewSet)

urlpatterns = [
    path("validate", views.validate),
    path("checkuser", views.check_user),
    path("get_user_posts/<str:uid>", views.get_user_posts),
    path("register", views.register_user),
    path("attendance", views.get_minimal_attendance),
    path("fullattendance", views.get_full_attendance),
    path("timetable", views.get_timetable),
    path("marks/<str:session>", views.get_marks),
    path("availablesessions", views.get_available_sessions),
    path("", include(router.urls)),
]
