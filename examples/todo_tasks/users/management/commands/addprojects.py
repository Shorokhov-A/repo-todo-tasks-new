from django.core.management import BaseCommand
from users.models import User
from TODO.models import Project


class Command(BaseCommand):
    def handle(self, *args, **options):
        project_1_name = 'Модель хранения данных сайта auto.ru'
        project_2_name = 'Интернет-магазин GeekShop'
        project_3_name = 'Многостраничный сайт'
        project_4_name = 'Сетевой чат'
        project_5_name = 'Веб-сервис по управлению ToDo-заметками'

        project_1_link = 'https://github.com/dream_team/repo_auto_ru_db_model'
        project_2_link = 'https://github.com/dream_team/repo_geekshop'
        project_3_link = 'https://github.com/dream_team/repo_site_template'
        project_4_link = 'https://github.com/dream_team/repo_geekchat'
        project_5_link = 'https://github.com/dream_team/repo_todo_drf'

        user_1 = User.objects.get(id=2)
        user_2 = User.objects.get(id=3)
        user_3 = User.objects.get(id=4)
        user_4 = User.objects.get(id=5)
        user_5 = User.objects.get(id=6)

        project = Project.objects.create(name=project_1_name, link=project_1_link)
        project.users.add(user_1)
        project.users.add(user_2)
        project.save()

        project = Project.objects.create(name=project_2_name, link=project_2_link)
        project.users.add(user_1)
        project.users.add(user_3)
        project.users.add(user_4)
        project.save()

        project = Project.objects.create(name=project_3_name, link=project_3_link)
        project.users.add(user_3)
        project.users.add(user_5)
        project.save()

        project = Project.objects.create(name=project_4_name, link=project_4_link)
        project.users.add(user_2)
        project.users.add(user_4)
        project.users.add(user_5)
        project.save()

        project = Project.objects.create(name=project_5_name, link=project_5_link)
        project.users.add(user_3)
        project.users.add(user_5)
        project.save()
