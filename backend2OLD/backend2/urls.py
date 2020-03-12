
"""backend2 URL Configuration

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
from django.urls import include, path
from django.contrib import admin
from rest_framework_nested import routers
from rest_framework.authtoken import views
from api.views import UserViewSet, GroupViewSet, DepartmentViewSet, OrganizationViewSet
from api.login import loginToken

router = routers.SimpleRouter()

router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'organizations', OrganizationViewSet)

org_router = routers.NestedSimpleRouter(router, r'organizations', lookup='organization')
org_router.register(r'departments', DepartmentViewSet, 'org_departments')
org_router.register(r'users', UserViewSet, 'org_user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include(org_router.urls)),
    path('api/login/', loginToken.as_view())
]