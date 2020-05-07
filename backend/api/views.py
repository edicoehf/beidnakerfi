from django.shortcuts import render, get_object_or_404

from rest_framework import permissions, status, filters
from rest_framework.viewsets import ModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Department, Organization, Cheque, Client
from .serializers import UserListSerializer, OrganizationListSerializer, DepartmentListSerializer, ChequeListSerializer, ClientSerializer,  \
                         UserDetailSerializer, OrganizationDetailSerializer, DepartmentDetailSerializer,  ChequeDetailSerializer, \
                         DepartmentActionSerializer, ChequeActionSerializer,  ClientActionSerializer, PasswordSerializer

from .permissions import IsAdmin, IsSelfOrAdmin, IsSuperUser, IsSelfOrSuper, IsManagerOrSuper, IsSelfOrManagerOrSuper, IsUserInOrg, IsUserOrgBuyer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    search_fields = [ 'username', 'email', 'departments__name' ]
    ordering_fields = [ 'username', 'email', 'departments' ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return User.objects.filter(organization=self.kwargs['organization_pk']).prefetch_related('department_user').order_by('-date_joined')
        else:
            organization = self.request.user.organization
            return User.objects.filter(organization=organization).prefetch_related('department_user').order_by('-date_joined')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer
        else:
            return UserListSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsManagerOrSuper, IsUserInOrg]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [permissions.IsAuthenticated, IsSelfOrManagerOrSuper, IsUserInOrg]
        elif self.action == 'activate' or self.action == 'deactivate':
            permission_classes = [permissions.IsAuthenticated, IsManagerOrSuper, IsUserInOrg]
        elif self.action == 'set_password':
            permission_classes = [permissions.IsAuthenticated, IsSelfOrManagerOrSuper, IsUserInOrg]
        return [permission() for permission in permission_classes]

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user_serializer = self.get_serializer(user)
            return Response({'success': True, 'message': 'User already disabled', 'user': user_serializer.data}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = False
        user.save()
        
        user_serializer = self.get_serializer(user)
        return Response({'success': True, 'message': 'User disabled', 'user': user_serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def activate(self, request, pk):
        user = self.get_object()
        if user.is_active:
            user_serializer = self.get_serializer(user)
            return Response({'success': True, 'message': 'User already active', 'user': user_serializer.data}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        
        user_serializer = self.get_serializer(user)
        return Response({'success': True, 'message': 'User activated', 'user': user_serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def deactivate(self, request, pk):
        user = self.get_object()
        if not user.is_active:
            user_serializer = self.get_serializer(user)
            return Response({'success': True, 'message': 'User already disabled', 'user': user_serializer.data}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = False
        user.save()
        
        user_serializer = self.get_serializer(user)
        return Response({'success': True, 'message': 'User disabled', 'user': user_serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['PUT'])
    def set_password(self, request, pk):
        user = self.get_object()

        if not user.is_active:
            return Response({'success': False, 'message': 'User disabled'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PasswordSerializer(data=request.data)

        # Superuser skips serializer check in order to set password for other users
        if serializer.is_valid() or request.user.is_superuser:
            if not user.check_password(serializer.data.get('old_password')) and not request.user.is_superuser:
                return Response({'success': False, 'messsage': 'Password incorrect'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            
            return Response({'success': True, 'message': 'New password set'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()

    def get_queryset(self):
        organization = self.request.user.organization.id
        return Organization.objects.filter(id=organization).prefetch_related('departments').order_by('name')

    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationListSerializer
        elif self.action == 'retrieve':
            return OrganizationDetailSerializer
        else:
            return OrganizationListSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsAdmin]

        return [permission() for permission in permission_classes]

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    search_fields = [ 'name', 'costsite' ]
    ordering_fields = [ 'name', 'costsite' ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return Department.objects.filter(organization=self.kwargs['organization_pk']).order_by('name')
        else:
            organization = self.request.user.organization
            return Department.objects.filter(organization=organization).order_by('name')

    def get_serializer_class(self):
        if self.action == 'list':
            return DepartmentListSerializer
        elif self.action == 'retrieve':
            return DepartmentDetailSerializer
        elif self.request.method == 'POST':
            return DepartmentActionSerializer
        elif self.request.method == 'DELETE':
            return DepartmentDetailSerializer
        else:
            return DepartmentListSerializer
    
    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsManagerOrSuper, IsUserInOrg]
        elif self.action == 'add_user' or self.action == 'remove_user':
            permission_classes = [permissions.IsAuthenticated, IsManagerOrSuper, IsUserInOrg]

        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['POST'])
    def add_user(self, request, pk):
        data = request.data

        if 'user' not in data:
            return Response({'success': False, 'error': 'Missing or incorrect data'}, status=status.HTTP_412_PRECONDITION_FAILED)
        try:
            user = User.objects.get(id=data['user'])
            department = Department.objects.get(id=pk)
            
            if department.users.filter(id=user.id, department_user=department).exists():
               return Response({'success': False, 'error': 'User already registered to department'}, status=status.HTTP_400_BAD_REQUEST)

            department.users.add(user)

            dep_serializer = self.get_serializer(department)
            return Response({'success': True, 'department': dep_serializer.data})
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def remove_user(self, request, pk):
        data = request.data

        if 'user' not in data:
            return Response({'success': False, 'error': 'Missing or incorrect data'}, status=status.HTTP_412_PRECONDITION_FAILED)
        try:
            user = User.objects.get(id=data['user'])
            department = Department.objects.get(id=pk)

            if not department.users.filter(id=user.id, department_user=department).exists():
                return Response({'success': False, 'error': 'User not in department'})

            department.users.remove(user)

            dep_serializer = self.get_serializer(department)
            return Response({'success': True, 'department': dep_serializer.data})

        except User.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Department.DoesNotExist:
            return Response({'success': False, 'error': 'Department not found'}, status=status.HTTP_400_BAD_REQUEST)

class ChequeViewSet(ModelViewSet):
    queryset = Cheque.objects.all()
    lookup_field = 'code'
    permission_classes = [permissions.IsAuthenticated]
    search_fields = [ 'code', 'description', 'invoice', 'created', 'user__username', 'department__name', 'department__costsite', 'seller__name' ]
    ordering_fields = [ 'code', 'price', 'description', 'created', 'user', 'department' ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_queryset(self):
        # variable_pk used to filter for nested relations
        # api/departments/:id/cheques/
        if 'department_pk' in self.kwargs:
            return Cheque.objects.filter(department=self.kwargs['department_pk']).select_related('user', 'department', 'seller').order_by('-created')
        # api/users/:id/cheques/
        elif 'user_pk' in self.kwargs:
            return Cheque.objects.filter(user=self.kwargs['user_pk']).select_related('user', 'department', 'seller').order_by('-created')
        # api/organizations/:id/cheques/
        elif 'organization_pk' in self.kwargs:
            return Cheque.objects.filter(seller=self.kwargs['organization_pk']).select_related('user', 'department', 'seller').order_by('-created')

        else:
            # Check for user privileges on main endpoint /api/cheques/
            user = self.request.user

            if user.is_superuser and not user.organization.is_seller:
                return Cheque.objects.filter(user__organization=user.organization.id).select_related('user', 'department', 'seller').order_by('-created')

            elif user.is_manager and not user.organization.is_seller:
                return Cheque.objects.filter(department__users=user).select_related('user', 'department', 'seller').order_by('-created')

            else:
                return Cheque.objects.filter(department__users=user).select_related('user', 'department', 'seller').order_by('-created')

    def get_serializer_class(self):
        if self.action == 'list':
            return ChequeListSerializer
        elif self.action == 'retrieve':
            return ChequeDetailSerializer
        elif self.action == 'partial_update':
            return ChequeActionSerializer
        else:
            return ChequeListSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create':
            permissions_classes = [permissions.IsAuthenticated, IsUserOrgBuyer, ]
        elif self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]

    def partial_update(self, request, *args, **kwargs):
        cheque = self.get_object()
        seller = Organization.objects.get(pk=request.user.organization.id)

        if not seller.is_seller:
            return Response({'success': False, 'error': 'Organization is not seller'}, status=status.HTTP_400_BAD_REQUEST)

        if not Client.objects.filter(buyer=cheque.user.organization, seller=seller).exists():
            return Response({'success': False, 'error': 'Seller not in Buyer client list'}, status=status.HTTP_400_BAD_REQUEST)

        if cheque.status == cheque.CREATED:
            request.data['status'] = cheque.PENDING
            request.data['seller'] = seller.id
        elif cheque.status == cheque.CANCELLED and request.user.is_superuser:
            request.data['status'] = cheque.PENDING
        elif cheque.status == cheque.PENDING:
            request.data['status'] = cheque.DONE
        elif cheque.status == cheque.DONE:
            request.data['status'] = cheque.PENDING

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        cheque = self.get_object()
        user = request.user

        # Cheque delete if user is owner and cheque not confirmed by seller
        # Cheque cancel if user is in seller organization and cheque pending
        if not cheque.seller or not user.organization.is_seller:
            if cheque.status <= cheque.CREATED:
                if cheque.user == user:
                    return super().destroy(request, *args, **kwargs)
                else:
                    return Response({'success': False, 'message': 'User not owner of cheque'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'success': False, 'message': 'Cheque already confirmed by seller. Seller must cancel for delete'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if cheque.status == cheque.PENDING:
                if cheque.seller == user.organization:
                    cheque.status = cheque.CANCELLED
                    cheque.save()
                    return Response({'success': True, 'message': 'Cheque cancelled'}, status=status.HTTP_200_OK)
                else:
                    return Response({'success': False, 'message': 'Seller organization not owner of cheque'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'success': False, 'message': 'Unable to cancel. Cheque not pending'}, status=status.HTTP_400_BAD_REQUEST)

    # Prints # of database queries for debugging optimization
    # def dispatch(self, *args, **kwargs):
    #     response = super().dispatch(*args, **kwargs)
    #     from django.db import connection
    #     print('# of Queries: {}'.format(len(connection.queries)))
    #     return response

class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    search_fields = [ 'buyer__name', 'seller__name ']
    ordering_fields = [ 'buyer', 'seller' ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_queryset(self):
        organization = self.request.user.organization
        if organization.is_seller:
            return Client.objects.filter(seller=organization).select_related('buyer', 'seller').order_by('buyer')
        else:
            return Client.objects.filter(buyer=organization).select_related('seller', 'buyer').order_by('seller')

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ClientSerializer
        elif self.action == 'create':
            return ClientActionSerializer
        else:
            return ClientSerializer
        return ClientSerializer