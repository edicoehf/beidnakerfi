from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import Organization, Department, UserProfile


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'organization']

class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'url', 'name', 'organization']

class UserDetailSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(source='userprofile.organization.name')
    organizationID = serializers.IntegerField(source='userprofile.organization.id')
    departments = DepartmentListSerializer(source='department_user', many=True)
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'organization', 'organizationID', 'departments']

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']

    def create(self, validated_data):
        print("kríeited")
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **validated_data)
        return user

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
