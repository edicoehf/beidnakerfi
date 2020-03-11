from django.shortcuts import render
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import User, Department, Organization
from .serializers import UserListSerializer, UserDetailSerializer, OrganizationListSerializer, OrganizationDetailSerializer, DepartmentListSerializer, DepartmentDetailSerializer

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
    permission_classes = [permissions.IsAuthenticated]

class OrganizationViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationListSerializer
        if self.action == 'retrieve':
            return OrganizationDetailSerializer

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
        if self.action == 'retrieve':
            return DepartmentDetailSerializer

    queryset = Department.objects.all()
    permission_classes = [permissions.IsAuthenticated] 