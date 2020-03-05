from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from .serializers import UserListSerializer, UserDetailSerializer, GroupSerializer, OrganizationListSerializer, OrganizationDetailSerializer, DepartmentListSerializer, DepartmentDetailSerializer
from .models import UserProfile, Department, Organization


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer

    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrganizationViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationListSerializer
        if self.action == 'retrieve':
            return OrganizationDetailSerializer

    queryset = Organization.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class DepartmentViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return DepartmentListSerializer
        if self.action == 'retrieve':
            return DepartmentDetailSerializer

    queryset = Department.objects.all()
    permission_classes = [permissions.IsAuthenticated]