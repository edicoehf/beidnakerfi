from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from api.models import User, Organization, Department

# Api Token
from rest_framework.authtoken.admin import TokenAdmin


# class UserProfileInline(admin.StackedInline):
#     model = UserProfile
#     can_delete = False
#     verbose_name_plural = 'userprofile'

# class UserAdmin(BaseUserAdmin):
#     inlines = (UserProfileInline,)

# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)

admin.site.register(User)

TokenAdmin._raw_id_fields = ['user']

admin.site.register(Organization)
admin.site.register(Department)