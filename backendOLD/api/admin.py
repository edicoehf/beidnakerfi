from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from tastypie.admin import ApiKeyInline
from django import forms

from api.models import Organization, Department, Cheques, User

class UserModelAdmin(UserAdmin):
    inlines = UserAdmin.inlines + [ApiKeyInline]

admin.site.unregister(User)
admin.site.register(User, UserModelAdmin)

# Register your models here.
admin.site.register(Organization)
admin.site.register(Cheques)
admin.site.register(Department)