from django.contrib.auth.models import User
from tastypie.resources import ModelResource
from tastypie.constants import ALL
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import DjangoAuthorization

from django.db.models import signals
from tastypie.models import create_api_key

from backend.models import Sellers

class SellerResource(ModelResource):
    class Meta:
        queryset = Sellers.objects.all()
        resource_name = 'sellers'
        filtering = {'name': ALL}

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'login'
        excludes = ['email', 'password', 'is_superuser']
        authentication = BasicAuthentication()
        authorization = DjangoAuthorization()
        print(authentication.is_authenticated)
        if authentication.is_authenticated:
            signals.post_save.connect(create_api_key, sender=User)

            #test