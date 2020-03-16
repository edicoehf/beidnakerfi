from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import Department

class loginToken(ObtainAuthToken):
    def _user_groups(self, user):
        groups = user.groups.all()
        if groups:
            group_list = []
            for group in groups:
                group_list.append(group.name)
            return group_list
        else:
            return None

    def _user_departments(self, user):
        departments = Department.objects.filter(users=user)
        if departments:
            dep_list = []
            for dep in departments:
                dep_list.append(dep.id)
            return dep_list
        else:
            return None

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'success': True,
            'token': token.key,
            'user': user.username,
            'org_id': user.organization.id,
            'department_id': self._user_departments(user),
            'groups': self._user_groups(user)
        })