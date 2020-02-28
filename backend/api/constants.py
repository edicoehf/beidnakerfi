# -- UNUSED --
from django.contrib.auth.models import Group, Permission

# Permissions name and code
all_crud = ('_all_crud', 'Can perform CRUD on all Resources')
cheque_crud = ('_cheque_crud', 'Can perform CRUD on cheques')
cheque_cr = ('_cheque_cr', 'Can Create & Read cheques')
user_crud = ('_user_crud', 'Can perform CRUD on users')
view_only = ('_view_only', 'Can only view resource')


# Permission list associated with groups
admin_perm = [all_crud]
super_perm = [cheque_crud, user_crud, view_only]
user_perm = [cheque_cr, view_only]

# Group names
ADMINISTRATOR = '_administrator'

BUYER_SUPER_USER = '_buyer_super_user'
BUYER_USER = '_buyer_user'

SELLER_SUPER_USER = '_seller_super_user'
SELLER_USER = '_seller_user'


# Group and permission list mappings
group_permissions = {ADMINISTRATOR: admin_perm,
                    BUYER_SUPER_USER: super_perm,
                    BUYER_USER: user_perm,
                    SELLER_SUPER_USER: super_perm,
                    SELLER_USER: user_perm}