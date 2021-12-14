from rest_framework.serializers import ModelSerializer, StringRelatedField
from TODO.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('name', 'link', 'users')


class ToDoModelSerializer(ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = ('text', 'created', 'updated', 'user', 'is_active')
