from django.urls import path
from . import views
from .views import CourseListView, TaskListView

urlpatterns = [
    path('register/', views.register),
    path('profile/', views.profile),
    path('courses/', CourseListView.as_view()),
    path('courses/<int:pk>/', views.course_detail),
    path('progress/', views.progress_list),
    path('tasks/', TaskListView.as_view()),
    path('tasks/<int:pk>/', views.task_detail),
    path('deadlines/', views.deadline_list),
]