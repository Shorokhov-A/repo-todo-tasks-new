from django.core.management import BaseCommand

from TODO.models import Project, ToDo
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        user_1 = User.objects.get(id=2)
        user_2 = User.objects.get(id=3)
        user_3 = User.objects.get(id=4)
        user_4 = User.objects.get(id=5)
        user_5 = User.objects.get(id=6)

        project_1 = Project.objects.get(id=1)
        project_2 = Project.objects.get(id=2)
        project_3 = Project.objects.get(id=3)
        project_4 = Project.objects.get(id=4)
        project_5 = Project.objects.get(id=5)

        ToDo.objects.create(project=project_1, user=user_1, text='Написать скрипты создания структуры базы данных')
        ToDo.objects.create(project=project_1, user=user_2, text='Написать скрипты наполнения БД данными')
        ToDo.objects.create(project=project_2, user=user_1, text='Создать приложение Products')
        ToDo.objects.create(project=project_2, user=user_1, text='Создать модели Product и ProductCategory')
        ToDo.objects.create(project=project_2, user=user_3, text='Создать собственную модель пользователя')
        ToDo.objects.create(project=project_2, user=user_4, text='Реализовать работу с корзиной')
        ToDo.objects.create(project=project_3, user=user_3, text='Сделать главную страницу сайта')
        ToDo.objects.create(project=project_3, user=user_5, text='Сделать главную страницу контактов')
        ToDo.objects.create(project=project_4, user=user_2, text='Создать интерфейс авторизации')
        ToDo.objects.create(project=project_4, user=user_4, text='Создать модель пользователя чата')
        ToDo.objects.create(project=project_4, user=user_5, text='Сделать главный интерфейс чата')
        ToDo.objects.create(project=project_5, user=user_3, text='Создать приложение для работы с пользователем')
        ToDo.objects.create(project=project_5, user=user_3, text='Создать свою модель пользователя')
        ToDo.objects.create(project=project_5, user=user_5, text='Создать приложение для работы с TODO')
        ToDo.objects.create(project=project_5, user=user_5, text='Добавить модель Project')
        ToDo.objects.create(project=project_5, user=user_5, text='Добавить модель ToDo')
