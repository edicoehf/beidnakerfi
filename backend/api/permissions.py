from rest_framework import permissions

class IsSelfOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_staff

class Dep_IsUserInOrg(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.organization == obj.organization

class Org_IsUserInOrg(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.organization == obj or request.user.is_staff

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