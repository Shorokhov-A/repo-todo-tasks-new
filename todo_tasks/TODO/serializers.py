from rest_framework.serializers import ModelSerializer, StringRelatedField, HyperlinkedModelSerializer
from TODO.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = ('text', 'created', 'updated', 'user', 'is_active')
