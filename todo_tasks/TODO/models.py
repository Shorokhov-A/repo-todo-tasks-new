from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.CharField(max_length=256, blank=True, null=True)
    users = models.ManyToManyField(User)
