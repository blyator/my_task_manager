from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend 
from sys import os

class TaskFetchGeneric(generics.ListCreateAPIView):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_completed'] 


class TaskDetailGeneric(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer