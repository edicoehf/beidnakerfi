from rest_framework import serializers
from .models import User, Organization, Department

class OrganizationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'is_seller']

class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'organization']

class UserListSerializer(serializers.ModelSerializer):
    organization = serializers.IntegerField(source='organization.id')
    departments = DepartmentListSerializer(source='department_user', many=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'organization', 'password', 'email', 'departments']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        org_id = validated_data.pop('organization')
        org = Organization.objects.get(id=org_id['id'])
        password = validated_data.pop('password')
        user = User(**validated_data, organization=org)
        user.set_password(password)
        user.save()
        return user

class DepartmentDetailSerializer(serializers.ModelSerializer):
    users = UserListSerializer(many=True)
    class Meta:
        model = Department
        fields = ['url', 'id', 'name', 'costsite', 'organization', 'users']

class UserDetailSerializer(serializers.ModelSerializer):
    organization = OrganizationListSerializer(required=True)
    departments = DepartmentListSerializer(source='department_user', many=True)
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'is_active', 'organization', 'departments')

class OrganizationDetailSerializer(serializers.ModelSerializer):
    departments = DepartmentListSerializer(many=True, read_only=True)
    class Meta:
        model = Organization
        fields = ['id', 'url', 'name', 'departments']