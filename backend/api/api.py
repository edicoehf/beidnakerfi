from django.conf.urls import url
from tastypie.resources import ModelResource, Resource
from tastypie.constants import ALL

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from tastypie.http import HttpUnauthorized, HttpForbidden, HttpNotFound
from tastypie.authentication import ApiKeyAuthentication
from tastypie.utils import trailing_slash

from api.models import Sellers, Departments, Buyers, Cheques

class SellerResource(ModelResource):
    class Meta:
        queryset = Sellers.objects.all()
        resource_name = 'sellers'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class BuyerResource(ModelResource):
    class Meta:
        queryset = Buyers.objects.all()
        resource_name = 'buyers'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class DepartmentResource(ModelResource):
    class Meta:
        queryset = Departments.objects.all()
        resource_name = 'departments'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class ChequesResource(ModelResource):
    class Meta:
        queryset = Cheques.objects.all()
        resource_name = 'cheques'
        filtering = {'name': ALL}
        authentication = ApiKeyAuthentication()

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        excludes = ['email', 'password', 'is_superuser']
        authentication = ApiKeyAuthentication()

    def _api_key(self, user):
        return user.api_key.key

    def _user_group(self, user):
        groups = user.groups.all()
        if groups:
            if groups.count() > 1:
                group_list = []
                for group in user.groups.all():
                    group_list.append(group)
                return group_list
            else:
                return groups[0].name
        else:
            return None

    def prepend_urls(self):
        params = (self._meta.resource_name, trailing_slash())
        return [
            url(r"^(?P<resource_name>%s)/login%s$" % params, self.wrap_view('login'), name="api_login")
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
                return self.create_response(request, {'success': True, 'api_key': self._api_key(user), 'username': username, 'groups': self._user_group(user)})
            else:
                return self.create_response(request, {'success': False, 'reason': 'disabled'}, HttpForbidden)
        else:
            return self.create_response(request, {'success': False, 'reason': 'Incorrect username or password'}, HttpUnauthorized)

# DEPRECATED
#
# class LoginResource(Resource):
#     class Meta:
#         resource_name = 'login'
#         allowed_methods= ['post']

#     def _api_key(self, user):
#         return user.api_key.key

#     def prepend_urls(self):
#         params = (self._meta.resource_name, trailing_slash())
#         return [
#             url(r"^(?P<resource_name>%s)/login%s$" % params, self.wrap_view('login'), name="api_login")
#         ]

#     def login(self, request, **kwargs):
#         self.method_check(request, allowed=['post'])
#         data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
        
#         username = data.get('username', '')
#         password = data.get('password', '')

#         user = authenticate(username=username, password=password)

#         if user:
#             if user.is_active:
#                 login(request, user)
#                 return self.create_response(request, {'success': True, 'api_key': self._api_key(user), 'username': username})
#             else:
#                 return self.create_response(request, {'success': False, 'reason': 'disabled'}, HttpForbidden)
#         else:
#             return self.create_response(request, {'success': False, 'reason': 'Incorrect username or password'}, HttpUnauthorized)

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

