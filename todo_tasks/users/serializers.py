from rest_framework.relations import HyperlinkedRelatedField
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    # user_permissions = HyperlinkedRelatedField(
    #     view_name='permission-detail',
    #     lookup_field='user_permissions',
    #     many=True,
    #     read_only=True,
    # )
    # groups = HyperlinkedRelatedField(
    #     view_name='group-detail',
    #     lookup_field='groups',
    #     many=True,
    #     read_only=True,
    # )

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email')
        # exclude = ('password',)


class UserModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
