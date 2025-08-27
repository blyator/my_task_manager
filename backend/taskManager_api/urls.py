from django.urls import path
from .views import TaskFetchGeneric, TaskDetailGeneric

urlpatterns = [
    path("tasks/", TaskFetchGeneric.as_view(), name="task-list-create"),  
    path("tasks/<int:pk>/", TaskDetailGeneric.as_view(), name="task-detail"),
]