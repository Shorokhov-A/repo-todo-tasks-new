from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo_tasks',
        'USER': 'andy',
        'PASSWORD': 'andy12345',
        'HOST': 'db',
        'PORT': '5432',
    }
}
