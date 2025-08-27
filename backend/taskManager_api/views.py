from rest_framework import generics
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer



class TaskFetchGeneric(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetailGeneric(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer