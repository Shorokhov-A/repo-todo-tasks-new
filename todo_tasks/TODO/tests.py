from django.test import TestCase
from mixer.backend.django import mixer
from requests.auth import HTTPBasicAuth
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, RequestsClient

from TODO.models import Project, ToDo
from TODO.views import ProjectModelViewSet
from users.models import User


class TestProjectModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            {'name': 'Test project', 'link': 'https://test_project.com'},
            format='json',
        )
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_guest(self):
        project = Project.objects.create(name='Test project', link='https://test_project.com')
        client = APIClient()
        response = client.put(
            f'/api/projects/{project.id}/',
            {'name': 'Edited project', 'link': 'https://test_project_updated.com'},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestToDoModelViewSet(APITestCase):
    def test_edit_admin(self):
        project = Project.objects.create(name='Test project', link='https://test_project.com')
        test_user = User.objects.create_superuser('user_1', 'test@mail.ru', 'n8Hje4Gr5wHr')
        to_do = ToDo.objects.create(text='Test todo text', project=project, user=test_user)
        self.client.login(username='user_1', password='n8Hje4Gr5wHr')
        response = self.client.put(
            f'/api/todo/{to_do.id}/',
            {'text': 'New test todo text', 'project': to_do.project.id, 'user': to_do.user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        to_do = ToDo.objects.get(id=to_do.id)
        self.assertEqual(to_do.text, 'New test todo text')

    def test_edit_mixer(self):
        User.objects.create_superuser('user_1', 'test@mail.ru', 'n8Hje4Gr5wHr')
        to_do = mixer.blend(ToDo)
        self.client.login(username='user_1', password='n8Hje4Gr5wHr')
        response = self.client.put(
            f'/api/todo/{to_do.id}/',
            {'text': 'New test text', 'project': to_do.project.id, 'user': to_do.user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        to_do = ToDo.objects.get(id=to_do.id)
        self.assertEqual(to_do.text, 'New test text')

    def test_create_project(self):
        User.objects.create_superuser('user_3', 'test@mail.ru', 'Bts7Ge4jNr5x')
        client = RequestsClient()
        client.auth = HTTPBasicAuth('user_3', 'Bts7Ge4jNr5x')
        response = client.post(
            'http://testserver/api/projects/',
            data={
                'name': 'New test project',
                'link': 'https://testproject.com/',
            }
        )
        assert response.status_code == 201
