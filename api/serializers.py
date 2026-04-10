from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from .models import Course, Progress

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