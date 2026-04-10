from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework.views import APIView
from .models import Course, Task
from .serializers import CourseSerializer, TaskSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"})
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = request.user.userprofile
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

class CourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(user=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
def course_detail(request, pk):
    try:
        course = Course.objects.get(pk=pk, user=request.user)
    except Course.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if request.method == 'GET':
        return Response(CourseSerializer(course).data)

    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        course.delete()
        return Response({'message': 'Deleted'}, status=204)

class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk, user=request.user)
    except Task.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if request.method == 'GET':
        return Response(TaskSerializer(task).data)

    elif request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        task.delete()
        return Response({'message': 'Deleted'}, status=204)