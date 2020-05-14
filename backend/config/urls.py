"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.authtoken import views
from rest_framework_nested import routers

from api.views import UserViewSet, DepartmentViewSet, OrganizationViewSet, ChequeViewSet, ClientViewSet
from api.login import loginToken

router = routers.SimpleRouter()

router.register(r'users', UserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'cheques', ChequeViewSet)
router.register(r'clients', ClientViewSet)

org_router = routers.NestedSimpleRouter(
    router, r'organizations', lookup='organization')
org_router.register(r'departments', DepartmentViewSet, 'org_departments')
org_router.register(r'users', UserViewSet, 'org_user')
org_router.register(r'cheques', ChequeViewSet, 'org_cheques')

dep_router = routers.NestedSimpleRouter(
    router, r'departments', lookup='department')
dep_router.register(r'cheques', ChequeViewSet, 'dep_cheques')

user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'cheques', ChequeViewSet, 'user_cheques')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include(org_router.urls)),
    path('api/', include(dep_router.urls)),
    path('api/', include(user_router.urls)),
    path('api/login/', loginToken.as_view(), name='login')
]
