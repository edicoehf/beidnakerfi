from django.contrib import admin
from backend.models import Buyers, Sellers, Cheques, Privileges, Departments

# Register your models here.
admin.site.register(Buyers)
admin.site.register(Sellers)
admin.site.register(Cheques)
admin.site.register(Privileges)
admin.site.register(Departments)