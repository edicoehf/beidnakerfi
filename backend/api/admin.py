from django.contrib import admin
# from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from .models import User, Organization, Department, Cheque, Client

# admin.site.unregister(User)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'organization')}),
        (('Info'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (('Dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide'),
            'fields': ('username','email', 'password1', 'password2', 'organization')
        }),
    )
    list_display = ('username', 'is_staff')
    search_fields = ('username',)

admin.site.register(Organization)
admin.site.register(Department)
admin.site.register(Cheque)
admin.site.register(Client)