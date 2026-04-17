from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Course, Progress, Task, Deadline

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user

class UserProfileSerializer(serializers.Serializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    bio = serializers.CharField()
    created_at = serializers.DateTimeField()

    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['created_at']

class ProgressSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    course_name = serializers.CharField(source='course.name', read_only=True)
    percent = serializers.IntegerField(min_value=0, max_value=100)

    def create(self, validated_data):
        return Progress.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.percent = validated_data.get('percent', instance.percent)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'course', 'course_name', 'priority', 'is_completed', 'created_at']
        read_only_fields = ['created_at']

class DeadlineSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())
    task_title = serializers.CharField(source='task.title', read_only=True)
    due_date = serializers.DateField()
    note = serializers.CharField(allow_blank=True)

    def create(self, validated_data):
        return Deadline.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.note = validated_data.get('note', instance.note)
        instance.save()
        return instance