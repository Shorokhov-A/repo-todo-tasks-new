from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from djangorestframework_camel_case.render import CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer
from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    renderer_classes = (CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
