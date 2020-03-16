from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.viewsets import ModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Department, Organization
from .serializers import UserListSerializer, UserDetailSerializer, OrganizationListSerializer, OrganizationDetailSerializer, DepartmentListSerializer, DepartmentDetailSerializer

from .permissions import IsAdminUser, IsLoggedInUserOrAdmin

from django.core.serializers import serialize

class UserViewSet(ModelViewSet):
    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return User.objects.filter(organization=self.kwargs['organization_pk'])
        else:
            return User.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer
        else:
            return UserListSerializer

    queryset = User.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated, IsAdminUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [permissions.IsAuthenticated, IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [permissions.IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]

class OrganizationViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationListSerializer
        elif self.action == 'retrieve':
            return OrganizationDetailSerializer
        else:
            return OrganizationListSerializer

    queryset = Organization.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class DepartmentViewSet(ModelViewSet):
    def get_queryset(self):
        if 'organization_pk' in self.kwargs:
            return Department.objects.filter(organization=self.kwargs['organization_pk'])
        else:
            return Department.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return DepartmentListSerializer
        elif self.action == 'retrieve':
            return DepartmentDetailSerializer
        else:
            return DepartmentListSerializer

    queryset = Department.objects.all()
    permission_classes = [permissions.IsAuthenticated] 


    @action(detail=True, methods=['post'])
    def add_user(self, request, pk):
        data = request.data

        if 'user' not in data:
            return Response({'success': False, 'error': 'Missing or incorrect data'}, status=status.HTTP_412_PRECONDITION_FAILED)
        try:
            user = User.objects.get(id=data['user'])
            department = Department.objects.get(id=pk)
            
            if department.users.filter(id=user.id, department_user=department).exists():
                return Response({'success': False, 'error': 'User already registered to department'})

            department.users.add(user)

            dep_serializer = self.get_serializer(department)
            return Response({'success': True, 'department': dep_serializer.data})
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_412_PRECONDITION_FAILED)