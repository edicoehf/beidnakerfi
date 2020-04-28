# API DOCUMENTATION
## Functional Endpoints
`admin/` Built-in Django admin web interface. Only accessible by admin (staff) users.

`api/login/`

+ `[POST]` Login point.  
    * Accepts `"username", "password"` as JSON body.  
    Returns API token to use for further requests. API token expires in 24 hours.

## Data Endpoints

All data requests require token authentication through the `Authorization` header, formatted as follows.
```json
"Authorization": "Token 59e80eae37366203169e9c00bc9df2556b5f4ed3"
```
All data is filtered by Organization. Users cannot interact with or read data from other organizations.

### Users

```json
{
    "username": "string",
    "email": "string@string.string",
    "password": "string",
    "organization":  "relation",
    "is_active": true,
    "is_superuser": false,
    "is_staff": false
} 
```

`api/users/`
    
+ `[GET]` Returns a list of all users within the request owners Organization.

+ `[POST]` Superuser and admin only. Creates a new user within the request owners Organization.

`api/users/:id/`

+ `[GET]` Returns detailed information for specific user.

+ `[PATCH]` Self or superuser/admin. Updates user information in specified fields.

+ `[DELETE]` Superuser and admin only. Deletes user from DB.

`api/users/:id/set_password/`

+ `[PUT]` Self or superuser/admin. Updates user password.
    * Accepts `"old_password, "new_password"` as JSON body.  
    `"old_password"` field optional for superusers.

`api/users/:id/activate/`

+ `[POST]` Superuser and admin only. Sets the users is_active flag to True, enabling the account if it was disabled. No body required.

`api/users/:id/deactivate/`

+ `[POST]` Superuser and admin only. Sets the users is_active flag to False, disabling the account if it was enabled. No body required.

`api/users/:id/cheques/`

+ `[GET]` Nested endpoint for cheques. Returns a list of all cheques created by the specified user.

`api/users/:id/cheques/:id/`

+ `[GET]` Returns detailed information for specified cheque of specified user. 
    * Further supports cheque actions through this nested endpoint. 

### Organizations

```json
{
    "name": "string",
    "is_seller": true
} 
```

`api/organizations/`

+ `[GET]` Returns list view of the request owners Organization.

+ `[POST]` Admin only. Creates a new Organization.

`api/organizations/:id/`

+ `[GET]` Returns detailed information of specified Organization.

+ `[PATCH]` Admin only. Updates organization information in specified fields.

+ `[DELETE]` Admin only. Deletes organization from DB.

`api/organizations/:id/departments/`

+ `[GET]` Returns a list of all departments belonging to the specified Organization.  
    * Further supports `departments/:id/` endpoint and all department actions.

`api/organizations/:id/users/`

+ `[GET]` Returns a list of all users belonging to the specified Organization.  
    * Further supports `users/:id/` endpoint and all user actions.

`api/organizations/:id/cheques/`

+ `[GET]` Returns a list of all cheques belonging to the specified Organization.  
    * Further supports `cheques/:id/` endpoint and all cheque actions.

### Departments

```json
{
    "name": "string",
    "costsite": "string",
    "organization": "relation",
    "users": "Many-to-Many relation"
} 
```

`api/departments/`

+ `[GET]` Returns a list of all Departments within request owners Organization.

+ `[POST]` Superuser and admin only. Creates a new Department

`api/departments/:id/`

+ `[GET]` Returns detailed information of specified Department.

+ `[PATCH]` Superuser and admin only. Updates department information in specified fields.

+ `[DELETE]` Superuser and admin only. Deletes department from DB.

`api/departments/:id/add_user/`

+ `[POST]` Superuser and admin only. Adds user to Department. 
    * Accepts `"user": {id}` as JSON body.

`api/departments/:id/remove_user/`

+ `[POST]` Superuser and admin only. Removes user from Department. 
    * Accepts `"user": {id}` as JSON body.

`api/departments/:id/cheques/`

+ `[GET]` Returns a list of all cheques belonging to the specified Department.  
    * Filters by seller field for users in seller organization
    * Filters by user.organization for superusers in buyer organization
    * Further supports `cheques/:id/` endpoint and all cheque actions.

### Clients

```json
{
    "buyer": "relation <Organization>",
    "seller": "relation <Organization>"
} 
```

`api/clients/`

+ `[GET]` Returns a list of all Client relations that include the request owners Organization.

+ `[POST]` Superuser and admin only. Creates a new Client relation.

`api/clients/:id/`

+ `[GET]` Returns detailed information of specified Client relation.

+ `[PATCH]` Superuser and admin only. Updates Client information in specified fields.

+ `[DELETE]` Superuser and admin only. Deletes Client relation from DB.

### Cheques

```json
{
    "status": 3,
    "code": 1234567890,
    "description": "string",
    "price": 122.0,
    "user": "relation",
    "department": "relation",
    "seller": "relation",
    "created": "datetime",
    "modified": "datetime"
} 
```

`api/cheques`

+ `[GET]` Returns a list of all Cheques.

+ `[POST]` Creates (and generates) a new cheque.  
    * Request owner organization must be buyer to use.  
    Accepts `"user_id", "dep_id"` as JSON body.  
    Returns generated cheque code, status, date created and last modified  

`api/cheques/:id/`

+ `[GET]` Returns detailed information of specified Cheque.

+ `[PATCH]` Updates Client information in specified fields.
    * Request owner organization must be seller to use.  
    Request owner and cheque user must have client relation to use.  
    Updates status to PENDING if status is CREATED or if request owner is Superuser.  
    Accepts `"description", "price", "seller"` as JSON body.  
    Updates specified fields.

+ `[DELETE]` Self, superuser and admin only. Deletes or cancels cheque depending on status.
    * DELETE  
    Request owner organization must be buyer.  
    Cheque status must be CREATED

    * CANCEL  
    Request owner organization must be seller.  
    Cheque status must be PENDING.