from django.utils import timezone
from django.db import models

from accounts.models import User


class Statement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    title = models.CharField(max_length=200, help_text="Please write title of statement.")
    statement_order = models.PositiveIntegerField(default=1)


class Post(models.Model):
    statement = models.ForeignKey(Statement, on_delete=models.CASCADE, related_name="posts")
    version_info = models.CharField(max_length=200, default="Initialized Version")
    content = models.TextField()
    edited_at = models.DateTimeField(auto_now=True)
    post_order = models.PositiveIntegerField(default=1)

    def duration(self):
        interval = timezone.now() - self.edited_at
        return round(interval.total_seconds() / 60)

    def __str__(self):
        return self.version_info
