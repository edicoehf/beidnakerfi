from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.viewsets import ModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Department, Organization, Cheque
from .serializers import UserListSerializer, UserDetailSerializer, OrganizationListSerializer, OrganizationDetailSerializer, DepartmentListSerializer, DepartmentDetailSerializer, ChequeListSerializer, ChequeDetailSerializer

from .permissions import IsAdmin, IsSelfOrAdmin, Org_IsUserInOrg, Dep_IsUserInOrg

from django.core.serializers import serialize

from django.forms.models import model_to_dict

class UserViewSet(ModelViewSet):
    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return User.objects.filter(organization=self.kwargs['organization_pk'])
        else:
            organization = self.request.user.organization
            return User.objects.filter(organization=organization).prefetch_related('department_user')
    
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
            permission_classes = [permissions.IsAuthenticated, IsAdmin]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [permissions.IsAuthenticated, IsSelfOrAdmin]
        return [permission() for permission in permission_classes]

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user_serializer = self.get_serializer(user)
            return Response({'success': True, 'message': 'User already disabled', 'user': user_serializer.data}, status=status.HTTP_304_NOT_MODIFIED)

        user.is_active = False
        user.save()
        
        user_serializer = self.get_serializer(user)
        return Response({'success': True, 'message': 'User disabled', 'user': user_serializer.data}, status=status.HTTP_204_NO_CONTENT)
    
    queryset = User.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['POST'])
    def activate(self, request, pk):
        user = self.get_object()
        if user.is_active:
            user_serializer = self.get_serializer(user)
            return Response({'success': True, 'message': 'User already active', 'user': user_serializer.data}, status=status.HTTP_304_NOT_MODIFIED)

        user.is_active = True
        user.save()
        
        user_serializer = self.get_serializer(user)
        return Response({'success': True, 'message': 'User activated', 'user': user_serializer.data}, status=status.HTTP_200_OK)


class OrganizationViewSet(ModelViewSet):
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
            permission_classes = [permissions.IsAuthenticated, Org_IsUserInOrg]
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsAdmin]

        return [permission() for permission in permission_classes]

    queryset = Organization.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

class DepartmentViewSet(ModelViewSet):
    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return Department.objects.filter(organization=self.kwargs['organization_pk'])
        else:
            organization = self.request.user.organization
            return Department.objects.filter(organization=organization)

    def get_serializer_class(self):
        if self.action == 'list':
            return DepartmentListSerializer
        elif self.action == 'retrieve':
            return DepartmentDetailSerializer
        elif self.request.method == 'POST':
            return DepartmentDetailSerializer
        elif self.request.method == 'DELETE':
            return DepartmentDetailSerializer
        else:
            return DepartmentListSerializer
    
    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated, Dep_IsUserInOrg]
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsAdmin]

        return [permission() for permission in permission_classes]

    queryset = Department.objects.all()
    permission_classes = [permissions.IsAuthenticated] 


    @action(detail=True, methods=['POST'])
    def add_user(self, request, pk):
        data = request.data

        if 'user' not in data:
            return Response({'success': False, 'error': 'Missing or incorrect data'}, status=status.HTTP_412_PRECONDITION_FAILED)
        try:
            user = User.objects.get(id=data['user'])
            department = Department.objects.get(id=pk)
            
            if department.users.filter(id=user.id, department_user=department).exists():
               return Response({'success': False, 'error': 'User already registered to department'}, status=status.HTTP_403_FORBIDDEN)

            department.users.add(user)

            dep_serializer = self.get_serializer(department)
            return Response({'success': True, 'department': dep_serializer.data})
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_412_PRECONDITION_FAILED)

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
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_412_PRECONDITION_FAILED)
        except Department.DoesNotExist:
            return Response({'success': False, 'error': 'Department not found'}, status=status.HTTP_412_PRECONDITION_FAILED)

class ChequeViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return ChequeListSerializer
        if self.action == 'retrieve':
            return ChequeDetailSerializer
        else:
            return ChequeListSerializer

    queryset = Cheque.objects.all()
    permission_classes = [permissions.IsAuthenticated] 

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     try:
    #         user = User.objects.get(id=data['user'])
    #         department = Department.objects.get(id=data['department'])

    #         if not department.users.filter(id=user.id, department_user=department).exists():
    #             return Response({'success': False, 'error': 'User not in department'}, status=status.HTTP_403_FORBIDDEN)

    #         data['user'] = model_to_dict(user)
    #         data['department'] = model_to_dict(department)
    #         return super(ChequeViewSet, self).create(request, *args, **kwargs)

    #     except User.DoesNotExist:
    #         return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_412_PRECONDITION_FAILED)
    #     except Department.DoesNotExist:
    #         return Response({'success': False, 'error': 'Department not found'}, status=status.HTTP_412_PRECONDITION_FAILED)