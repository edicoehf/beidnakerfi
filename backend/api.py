from django.contrib.auth.models import User
from tastypie.resources import ModelResource
from tastypie.constants import ALL
from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication, MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.validation import Validation

from django.db.models import signals
from tastypie.models import create_api_key

from backend.models import Sellers, Departments, Buyers, Cheques

class SellerResource(ModelResource):
    class Meta:
        queryset = Sellers.objects.all()
        resource_name = 'sellers'
        filtering = {'name': ALL}

class BuyerResource(ModelResource):
    class Meta:
        queryset = Buyers.objects.all()
        resource_name = 'buyers'
        filtering = {'name': ALL}

class DepartmentResource(ModelResource):
    class Meta:
        queryset = Departments.objects.all()
        resource_name = 'departments'
        filtering = {'name': ALL}

class ChequesResource(ModelResource):
    class Meta:
        queryset = Cheques.objects.all()
        resource_name = 'cheques'
        filtering = {'name': ALL}

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'login'
        excludes = ['email', 'password', 'is_superuser']
        
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        validation = Validation()

        if authentication.is_authenticated:
            signals.post_save.connect(create_api_key, sender=User)