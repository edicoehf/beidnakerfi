from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import Organization, Department, User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'url', 'name', 'organization']

class UserDetailSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(source='user.organization.name')
    organizationID = serializers.IntegerField(source='user.organization.id')
    departments = DepartmentListSerializer(source='department_user', many=True)
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'organization', 'organizationID', 'departments']

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']

class DepartmentDetailSerializer(serializers.ModelSerializer):
    users = UserListSerializer(many=True)
    class Meta:
        model = Department
        fields = ['id', 'url', 'name', 'costsite', 'organization', 'users']

class OrganizationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'url', 'name']
    
class OrganizationDetailSerializer(serializers.ModelSerializer):
    departments = DepartmentListSerializer(many=True, read_only=True)
    class Meta:
        model = Organization
        fields = ['id', 'url', 'name', 'departments']
