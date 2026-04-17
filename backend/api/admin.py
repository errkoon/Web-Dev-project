from django.contrib import admin
from .models import UserProfile, Course, Progress, Task, Deadline

admin.site.register(UserProfile)
admin.site.register(Course)
admin.site.register(Progress)
admin.site.register(Task)
admin.site.register(Deadline)