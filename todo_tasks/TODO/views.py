from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from djangorestframework_camel_case.render import CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer
from TODO.models import Project, ToDo
from TODO.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = (CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer)
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    renderer_classes = (CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer)
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
