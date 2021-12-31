from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient

from TODO.models import Project
from TODO.views import ProjectModelViewSet


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
