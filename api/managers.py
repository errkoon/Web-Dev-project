from django.db import models

class TaskManager(models.Manager):
    def completed(self):
        return self.filter(is_completed=True)

    def pending(self):
        return self.filter(is_completed=False)

    def high_priority(self):
        return self.filter(priority='high', is_completed=False)