from rest_framework.serializers import ModelSerializer, StringRelatedField, HyperlinkedModelSerializer
from TODO.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
