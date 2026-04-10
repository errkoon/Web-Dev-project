from django.urls import path
from . import views
from .views import CourseListView, course_detail

urlpatterns = [
    path('register/', views.register),
    path('profile/', views.profile),
    path('courses/', views.CourseListView.as_view()),
    path('courses/<int:pk>/', views.course_detail),
]