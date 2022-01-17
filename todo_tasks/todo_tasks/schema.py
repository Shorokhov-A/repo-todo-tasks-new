import graphene
from graphene_django import DjangoObjectType
from TODO.models import Project, ToDo
from users.models import User


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class Query(graphene.ObjectType):
    all_tasks = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)

    def resolve_all_tasks(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return  User.objects.all()


schema = graphene.Schema(query=Query)
