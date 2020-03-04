from django.conf.urls import url, include
from tastypie.api import Api
from api.api import ProfileResource, UserResource, OrganizationResource, DepartmentResource, ChequesResource


ape = Api(api_name='api')
ape.register(ProfileResource())
ape.register(UserResource())
ape.register(OrganizationResource())
ape.register(DepartmentResource())
ape.register(ChequesResource())

# seller = Api(api_name='seller')
# seller.register(SellerResource())
# seller.register(DepartmentResource())
# seller.register(ChequesResource())

# buyer = Api(api_name='buyer')
# buyer.register(BuyerResource())
# buyer.register(DepartmentResource())
# buyer.register(ChequesResource())

# user = Api(api_name='user')
# user.register(UserResource())
# user.register(LoginResource())

# user_resource = UserResource()

urlpatterns = [
    url(r'^', include(ape.urls)),
    # url(r'^api/', include(user_resource.urls))
]
