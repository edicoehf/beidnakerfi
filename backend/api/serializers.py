from rest_framework import serializers
from .models import User, Organization, Department, Cheque, Client

from .code_generate import unique_code

class OrganizationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'is_seller']

class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'costsite', 'organization']

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserListSerializer(serializers.ModelSerializer):
    organization = serializers.IntegerField(source='organization.id', write_only=True)
    departments = DepartmentListSerializer(source='department_user', many=True, required=False, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_manager', 'email', 'departments', 'organization']
        extra_kwargs = {'password': {'write_only': True}, 'is_manager': {'write_only': True}}
    
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

class DepartmentActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name', 'costsite']

    def create(self, validated_data):
        request = self.context['request']
        user = request.user

        validated_data['organization'] = user.organization
        validated_data['users'] = [ user ]

        return super().create(validated_data)
        
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

class ChequeListSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    department = DepartmentListSerializer(read_only=True)
    seller = OrganizationListSerializer(read_only=True)

    user_id =  serializers.IntegerField(source='user.id', write_only=True)
    dep_id = serializers.IntegerField(source='department.id', write_only=True)
    class Meta:
        model = Cheque
        fields = ('code', 'status', 'created', 'user', 'department', 'seller', 'user_id', 'dep_id')
        extra_kwargs = {'code': {'read_only': True}, 'description': {'read_only': True}, 'price': {'read_only': True}}

    def create(self, validated_data):
        try:
            user_id = validated_data.pop('user')
            user = User.objects.get(id=user_id['id'])
            dep_id = validated_data.pop('department')
            department = Department.objects.get(id=dep_id['id'])

            if user.organization.is_seller:
                raise serializers.ValidationError("Organization is not buyer")

            if not department.users.filter(id=user.id, department_user=department).exists():
                raise serializers.ValidationError("User not in department")

            code = unique_code()

            cheque = Cheque(**validated_data, code=code, user=user, department=department, price=0, description="")
            cheque.save()
            return cheque

        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")
            # return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_412_PRECONDITION_FAILED)

        except Department.DoesNotExist:
            raise serializers.ValidationError("Department does not exist")
            # return Response({'success': False, 'error': 'Department not found'}, status=status.HTTP_412_PRECONDITION_FAILED)

class ChequeDetailSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer()
    department = DepartmentListSerializer()
    seller = OrganizationListSerializer()
    class Meta:
        model = Cheque
        fields = ['code', 'invoice', 'status', 'description', 'price', 'user', 'department', 'seller', 'created', 'modified']

class ChequeActionSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer()
    department = DepartmentListSerializer()
    
    class Meta:
        model = Cheque
        fields = ['code', 'invoice', 'status', 'description', 'price', 'user', 'department', 'seller', 'created', 'modified']

class ClientSerializer(serializers.ModelSerializer):
    buyer = OrganizationListSerializer()
    seller = OrganizationListSerializer()
    class Meta:
        model = Client
        fields = ['buyer', 'seller']

class ClientActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['buyer', 'seller']

    def create(self, validated_data):
        seller = validated_data.get('seller')
        buyer = validated_data.get('buyer')

        if not seller.is_seller:
            raise serializers.ValidationError("Seller organization is not seller")

        if buyer.is_seller:
            raise serializers.ValidationError("Buyer organization is not buyer")

        return super().create(validated_data)
        
class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)