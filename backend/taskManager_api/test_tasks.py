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
