from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
