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
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class Query(graphene.ObjectType):
    all_tasks = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_user_name = graphene.List(ProjectType, name=graphene.String(required=False))
    projects_by_user_id = graphene.List(ProjectType, user_id=graphene.Int(required=False))
    tasks_by_user_id = graphene.List(ToDoType, user_id=graphene.Int(required=False))

    def resolve_all_tasks(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return  User.objects.all()

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_projects_by_user_name(root, info, name=None):
        projects = Project.objects.all()
        if name:
            first_name, last_name = name.split()
            projects = projects.filter(users__first_name=first_name, users__last_name=last_name)
        return projects

    def resolve_projects_by_user_id(root, info, user_id=None):
        projects = Project.objects.all()
        if user_id:
            projects = projects.filter(users__id=user_id)
        return projects

    def resolve_tasks_by_user_id(root, info, user_id=None):
        tasks = ToDo.objects.all()
        if user_id:
            tasks = tasks.filter(user_id=user_id)
        return tasks


schema = graphene.Schema(query=Query)
