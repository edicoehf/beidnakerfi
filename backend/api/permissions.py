from rest_framework import permissions


class IsManagerOrSuper(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.is_manager

    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or request.user.is_manager


class IsSelfOrManagerOrSuper(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_manager or request.user.is_superuser


class IsSelfOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff


class IsSelfOrSuper(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_superuser


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_superuser


class IsUserInOrg(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.organization == obj.organization or request.user.is_staff


class IsUserOrgBuyer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return not request.user.organization.is_seller


"""
#### USERS
## LIST
Allir filter eftir Org
## RETRIEVE
Allir filter eftir Org
## CREATE
Admin only (Super_User)
## UPDATE
Admin or self (Super_User)
## DESTROY
Admin Only (Super_User)

#### DEPARTMENTS
## LIST
Allir filter eftir Org
## RETRIEVE
Allir filter eftir Org
## CREATE
Admin only (Super_User)
## UPDATE
Admin only (Super_User)
## DESTROY
Admin only (Super_User)

#### ORGANIZATIONS
## LIST
Admin Only
## RETRIEVE
Allir filter eftir Org
## CREATE
Admin Only
## UPDATE
Admin Only
## DESTROY
Admin Only

#### CHEQUES (TODO)
## LIST
Admin Only
## RETRIEVE
Allir filter eftir Org
## CREATE
Admin Only
## UPDATE
Admin Only
## DESTROY
Admin Only
"""
