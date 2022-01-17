import graphene
from graphene_django import DjangoObjectType
from TODO.models import Project, ToDo
from users.models import User


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_tasks = graphene.List(ToDoType)

    def resolve_all_tasks(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
