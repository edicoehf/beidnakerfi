from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Department, User

from .authentication import token_login_handler, expire_time
import logging
import sys


logger = logging.getLogger(__name__)

class loginToken(ObtainAuthToken):
    def _user_groups(self, user):
        print("Inside _user_groups")
        groups = user.groups.all()
        if groups:
            group_list = []
            for group in groups:
                group_list.append(group.name)
            return group_list
        else:
            return None

    def _user_departments(self, user):
        print("Inside _user_departments")
        departments = Department.objects.filter(users=user)
        if departments:
            dep_list = []
            for dep in departments:
                dep_list.append({"id": dep.id, "name": dep.name})
            return dep_list
        else:
            return None

    def post(self, request, *args, **kwargs):
        #print("Inside loginToken.post")
        #user = {}
        #token = {}
        #created = False
        #try:
        #    logger.info("Inside loginToken.post -2")
        #    users = User.objects.filter(username = "admin")
        #    logger.info("Inside loginToken.post -1")
        #    for u in users:
        #        u.set_password("admin")
        #        logger.info("Inside loginToken.post 0")
        #        u.save()

        #    logger.info("Inside loginToken.post 1")
        #    logger.info("Inside loginToken.post 2")
        #    logger.info(serializer)

        #    logger.info("Inside loginToken.post 3")
        #    logger.info("Inside loginToken.post 4")

        #    logger.info("Inside loginToken.post 5")
        #        logger.info("Inside loginToken.post 6")

        #except ValidationError as e:
        #    logger.error("error doing stuff:")
        #    logger.error(e)
        #    raise
        #    logger.error(sys.exc_info()[0])

        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if not created:
            token = token_login_handler(token)

        return Response({
            'success': True,
            'token': token.key,
            'expires_in': expire_time(token).seconds,
            'id': user.id,
            'user': user.username,
            'org_id': user.organization.id,
            'org_seller': user.organization.is_seller,
            'is_superuser': user.is_superuser,
            'is_manager': user.is_manager

        })
