from django.urls import path
from . import views
from .views import CourseListView, course_detail

urlpatterns = [
    path('register/', views.register),
    path('profile/', views.profile),
    path('courses/', views.CourseListView.as_view()),
    path('courses/<int:pk>/', views.course_detail),
    path('tasks/', views.TaskListView.as_view()),
    path('tasks/<int:pk>/', views.task_detail),
]