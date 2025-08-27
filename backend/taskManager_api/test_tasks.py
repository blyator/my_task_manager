import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Task

@pytest.mark.django_db
def test_task_list_returns_empty():
    client = APIClient()
    url = reverse("task-list")
    response = client.get(url)
    assert response.status_code == 200
    assert response.json() == {'count': 0, 'next': None, 'previous': None, 'results': []}

@pytest.mark.django_db
def test_create_task():
    client = APIClient()
    url = reverse("task-list")
    data = {"title": "Pytest Task", "description": "Testing with pytest"}
    response = client.post(url, data, format="json")
    assert response.status_code == 201
    assert Task.objects.count() == 1
    task = Task.objects.first()
    assert task.title == "Pytest Task"

@pytest.mark.django_db
def test_delete_task():
    task = Task.objects.create(title="Task to Delete", description="This task will be deleted")
    
    client = APIClient()
    url = reverse("task-detail", args=[task.id])
    
    response = client.delete(url)
    
    assert response.status_code == 204
    assert Task.objects.count() == 0
