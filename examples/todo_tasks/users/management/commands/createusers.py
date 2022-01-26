from django.core.management import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        su_username = 'django'
        su_email = 'django@geekbrains.ru'
        su_password = 'geekbrains'
        usernames_arr = ('user_1', 'user_2', 'user_3', 'user_4', 'user_5')
        first_names_arr = ('Oliver', 'Jack', 'Charley', 'Harry', 'Thomas')
        last_names_arr = ('Williams', 'Gibson', 'Martin', 'Jackson', 'Davis')
        email_arr = (
            'Oliver_William@gmail.com',
            'Jack_Gibson@gmail.com',
            'Charley_Martin@gmail.com',
            'Harry_Jackson@gmail.com',
            'Thomas_Davis@gmail.com',
        )

        user_password = 'Bts7Ge4jNr5x'

        try:
            User.objects.create_superuser(su_username, su_email, su_password)
        except Exception as e:
            print(f'Ошибка: {e}')

        for username, first_name, last_name, email in zip(usernames_arr, first_names_arr, last_names_arr, email_arr):
            try:
                User.objects.create_user(username, email, user_password, first_name=first_name, last_name=last_name)
            except Exception as e:
                print(f'Ошибка: {e}')