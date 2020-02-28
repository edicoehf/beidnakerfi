from django.conf.urls import url
from tastypie.resources import ModelResource, Resource, ALL, ALL_WITH_RELATIONS

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from tastypie.http import HttpUnauthorized, HttpForbidden, HttpNotFound, HttpBadRequest, HttpResponse, HttpCreated
from tastypie.authentication import ApiKeyAuthentication
from tastypie.utils import trailing_slash

from tastypie import fields
from tastypie.authorization import DjangoAuthorization, Authorization
from .exceptions import CustomBadRequest

from django.db.models import signals

# from api.models import Sellers, Departments, Buyers, Cheques

from api.models import Organization, Department, Cheques, Profile

class DepartmentResource(ModelResource):
    class Meta:
        queryset = Department.objects.all()
        resource_name = 'departments'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class OrganizationResource(ModelResource):
    departments = fields.ToManyField(DepartmentResource, 'department_set',
        related_name='departments', use_in='detail', full=True)

    class Meta:
        queryset = Organization.objects.all()
        allowed_methods = ['get']
        resource_name = 'organizations'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class ChequesResource(ModelResource):
    class Meta:
        queryset = Cheques.objects.all()
        resource_name = 'cheques'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class ProfileResource(ModelResource):
    organizations = fields.ForeignKey(OrganizationResource, 'org_id', use_in='detail', full=True)
    class Meta:
        queryset = Profile.objects.all()
        resource_name = 'profiles'
        authentication = ApiKeyAuthentication()

class UserResource(ModelResource):
    profile = fields.ForeignKey(ProfileResource, 'profile', use_in='detail', full=True)
    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        excludes = ['email', 'password', 'is_superuser']
        authentication = ApiKeyAuthentication()
        # authorization = DjangoAuthorization()

    def _api_key(self, user):
        return user.api_key.key

    def _user_group(self, user):
        groups = user.groups.all()
        if groups:
            group_list = []
            for group in user.groups.all():
                group_list.append(group)
            return group_list
        else:
            return None
        
    def _user_org_id(self, user):
        profile = Profile.objects.get(user=user)
        return profile.org_id.id

    def prepend_urls(self):
        params = (self._meta.resource_name, trailing_slash())
        return [
            url(r"^(?P<resource_name>%s)/login%s$" % params, self.wrap_view('login'), name="api_login"),
        ]

    def login(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
        
        username = data.get('username', '')
        password = data.get('password', '')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return self.create_response(request, {'success': True, 'api_key': self._api_key(user), 'username': username, 'groups': self._user_group(user), 'org_id': self._user_org_id(user)})
            else:
                return self.create_response(request, {'success': False, 'reason': 'disabled'}, HttpForbidden)
        else:
            return self.create_response(request, {'success': False, 'reason': 'Incorrect username or password'}, HttpUnauthorized)

    def obj_create(self, bundle, request=None, **kwargs):
        try:
            username, email, password, org_id = bundle.data['username'], bundle.data['email'], bundle.data['password'], bundle.data['org_id']
           
            if User.objects.filter(email=email):
                raise CustomBadRequest(code="duplicate_exception", message="That email is already in use")
            
            if User.objects.filter(username=username):
                raise CustomBadRequest(code="duplicate_exception", message="That email is already in use")
       
        except KeyError as missing_key:
            raise CustomBadRequest(code="missing_key", message="Missing field {missing_key}".format(missing_key=missing_key))
       
        except User.DoesNotExist:
            pass

        newuser = User(username=username, email=email)
        newuser.set_password(password)
        newuser._org_id = org_id
        newuser.save()

        return bundle

    # def logout(self, request, **kwargs):
    #     self.method_check(request, allowed=['get'])
    #     self.is_authenticated(request)

    #     if request.user and request.user.is_authenticated():
    #         logout(request)
    #         return self.create_response(request, { 'success': True })
    #     else:
    #         return self.create_response(request, { 
    #             'success': False, 
    #             'error_message': 'Not authenticated' 
    #         })

