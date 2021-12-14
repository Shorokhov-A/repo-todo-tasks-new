from rest_framework.serializers import ModelSerializer, StringRelatedField
from TODO.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('name', 'link', 'users')
