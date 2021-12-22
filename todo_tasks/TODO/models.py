from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(max_length=256, blank=True, null=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField()
    created = models.DateTimeField(verbose_name='дата создания', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='дата обновления', auto_now=True)
    user = models.ForeignKey(User, models.PROTECT)
    is_active = models.BooleanField(default=True)
