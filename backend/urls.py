from django.conf.urls import url, include
from tastypie.api import Api
from backend.api import SellerResource, DepartmentResource

ape = Api(api_name='ape')
ape.register(SellerResource())
ape.register(DepartmentResource())

urlpatterns = [
     url(r'^api/', include(ape.urls))   
]
