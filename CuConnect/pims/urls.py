from django.urls import path, include
from . import views

urlpatterns = [
    path("validate", views.Validate),
    path("get_full_name", views.get_full_name),
]
