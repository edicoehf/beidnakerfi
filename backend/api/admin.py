from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from tastypie.admin import ApiKeyInline

from api.models import Buyers, Sellers, Cheques, Privileges, Departments

class UserModelAdmin(UserAdmin):
    inlines = UserAdmin.inlines + [ApiKeyInline]

admin.site.unregister(User)
admin.site.register(User, UserModelAdmin)

# Register your models here.
admin.site.register(Buyers)
admin.site.register(Sellers)
admin.site.register(Cheques)
admin.site.register(Privileges)
admin.site.register(Departments)