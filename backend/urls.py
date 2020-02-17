from django.conf.urls import url, include
from tastypie.api import Api
from backend.api import SellerResource, DepartmentResource, BuyerResource, ChequesResource

seller = Api(api_name='seller')
seller.register(SellerResource())
seller.register(DepartmentResource())
seller.register(ChequesResource())

buyer = Api(api_name='buyer')
buyer.register(BuyerResource())
buyer.register(DepartmentResource())
buyer.register(ChequesResource())

urlpatterns = [
     url(r'^api/', include(seller.urls)),
     url(r'^api/', include(buyer.urls))
]
