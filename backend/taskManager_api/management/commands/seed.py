from django.core.management.base import BaseCommand
from taskManager_api.models import Task

class Command(BaseCommand):
    help = "Seed the database with initial tasks"

    def handle(self, *args, **kwargs):
        tasks = [
            {"title": "Buy groceries", "description": "Milk, bread, eggs, and fruits"},
            {"title": "Finish project report", "description": "Complete the final draft"},
            {"title": "Read a book", "description": "At least 30 pages of a novel"},
            {"title": "Workout", "description": "45-minute session at the gym"},
            {"title": "Clean the house", "description": "Living room and kitchen"},
            {"title": "Pay electricity bill", "description": "Due by Friday"},
            {"title": "Call mom", "description": "Weekly check-in call"},
            {"title": "Prepare dinner", "description": "Cook pasta and salad"},
            {"title": "Study Django", "description": "Learn about DRF pagination"},
            {"title": "Water plants", "description": "Indoor and outdoor plants"},
            {"title": "Email client", "description": "Follow up on project updates"},
            {"title": "Schedule meeting", "description": "Set up Zoom call with team"},
            {"title": "Organize files", "description": "Sort work documents"},
            {"title": "Buy printer ink", "description": "Check store near office"},
            {"title": "Plan trip", "description": "Research flights and hotels"},
            {"title": "Backup laptop", "description": "Use external hard drive"},
            {"title": "Learn React", "description": "Start with components basics"},
            {"title": "Take car for service", "description": "Oil change and checkup"},
            {"title": "Practice coding", "description": "Work on LeetCode problems"},
            {"title": "Meditation", "description": "10 minutes mindfulness"},
            {"title": "Update resume", "description": "Add recent work experience"},
            {"title": "Do laundry", "description": "Wash and fold clothes"},
            {"title": "Watch tutorial", "description": "Follow DRF YouTube guide"},
            {"title": "Write blog post", "description": "Topic: REST APIs with Django"},
            {"title": "Grocery list update", "description": "Add rice and beans"},
        ]

        for task in tasks:
            Task.objects.get_or_create(title=task["title"], defaults={"description": task["description"]})

        self.stdout.write(self.style.SUCCESS("Successfully seeded"))
