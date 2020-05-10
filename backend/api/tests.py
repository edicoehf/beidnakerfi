from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from .models import Token, Organization, User, Department

# Create your tests here.
class LoginTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("login")

        self.org_buyer = Organization.objects.create(name="Buyer Organization", is_seller=False)

        self.buyer = User.objects.create_user(username="buyer", email="buyer@email.com", password="edico123", organization=self.org_buyer)

    def test_login(self):
        """POST /api/login/ returns 200 OK and data """

        data = {
            "username": "buyer",
            "password": "edico123"
        }
        
        response = self.client.post(self.url, data)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        data_size = len(response.data)
        assert data_size == 9, \
            "Expected 9 fields. Got: {}".format(data_size)
        
        assert response.data['id'] == 1, \
            "Expected ID: 1. Got: {}".format(response.data['id'])
    
    def test_incorrect_login(self):
        """POST /api/login/ returns 400 Unauthorized and error message """

        data = {
            "username": "buyer",
            "password": "incorrect"
        }
        
        response = self.client.post(self.url, data)

        assert response.status_code == 400, \
            "Expected 400 Unauthorized. Got: {}".format(response.status_code)

        data_size = len(response.data)
        assert data_size == 1, \
            "Expected 1 field. Got: {}".format(data_size)

    def tearDown(self):
        for user in User.objects.all():
            user.delete()
        for organization in Organization.objects.all():
            organization.delete()

class UserTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.org_seller = Organization.objects.create(name="Seller Organization", is_seller=True)

        self.seller = User.objects.create_user(username="seller", email="seller@email.com", password="edico123", organization=self.org_seller)
        self.superseller = User.objects.create_superuser(username="superseller", email="superseller@email.com", password="edico123", organization=self.org_seller)
        self.manager = User.objects.create_user(username="manager", password="edico123", is_manager=True, organization=self.org_seller)
        self.inactive = User.objects.create_user(username="inactive", password="edico123", is_active=False, organization=self.org_seller)

        return super().setUp()

#-------------------------------------- GET
    def test_get_users_no_login(self):
        """GET /api/users/ returns 401 Unauthorized and error """
        url = reverse("user-list")

        response = self.client.get(url)

        assert response.status_code == 401, \
            "Expected 401 Unauthorized. Got: {}".format(response.status_code)

        assert response.data['detail'] == "Authentication credentials were not provided.", \
            "Expected 'Authentication credentials were not provided.' error message. Got: {}".format(response.data['detail'])

    def test_get_users(self):
        """GET /api/users/ returns 200 OK and data """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-list")
        response = self.client.get(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        body = response.json()['results']
        assert len(body) == 4, \
            "Expected 4 results. Got: {}".format(len(body))

    def test_get_user_detail(self):
        """GET /api/users/:id/ returns 200 OK and data """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.get(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        assert response.data['id'] == 1, \
            "Expected ID: 1. Got: {}".format(response.data['id'])

    def test_user_get_data_filter(self):
        """GET /api/users/:id/ of another Organization returns 403 Forbidden """
        org_buyer = Organization.objects.create(name="Buyer Organization", is_seller=False)

        buyer = User.objects.create_user(username="buyer", email="buyer@email.com", password="edico123", organization=org_buyer)

        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-detail", args=[buyer.pk])
        response = self.client.get(url)

        
        assert response.status_code == 404, \
            "Expected 404 Not Found. Got: {}".format(response.status_code)

#-------------------------------------- CREATE
    def test_create_user(self):
        """POST /api/users/ returns 403 Forbidden and error """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-list")

        data = {
            "username": "seller2",
            "password": "edico123"
        }

        response = self.client.post(url, data)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

        assert response.data['detail'] == "You do not have permission to perform this action.", \
            "Expected 'You do not have permission to perform this action.' error message. Got: {}".format(response.data['detail'])

    def test_create_user_as_manager(self):
        """POST /api/users/ returns 201 Created and data """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-list")

        data = {
            "username": "seller2",
            "email": "seller2@seller.com",
            "password": "edico123",
            "organization": 1
        }

        response = self.client.post(url, data)
        assert response.status_code == 201, \
            "Expected 201 Created. Got: {}".format(response.status_code)

        data_size = len(response.data)
        assert data_size == 4, \
            "Expected 4 fields. Got: {}".format(data_size)

        assert response.data['id'] == 5, \
            "Expected ID: 5. Got: {}".format(response.data['id'])

        assert response.data['username'] == "seller2", \
            "Expected username: seller2. Got: {}".format(response.data['username'])

    def test_create_user_as_super(self):
        """POST /api/users/ returns 201 Created and data """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-list")

        data = {
            "username": "seller2",
            "email": "seller2@seller.com",
            "password": "edico123",
            "organization": 1
        }

        response = self.client.post(url, data)
        assert response.status_code == 201, \
            "Expected 201 Created. Got: {}".format(response.status_code)

        data_size = len(response.data)
        assert data_size == 4, \
            "Expected 4 fields. Got: {}".format(data_size)

        assert response.data['id'] == 5, \
            "Expected ID: 5. Got: {}".format(response.data['id'])

        assert response.data['username'] == "seller2", \
            "Expected username: seller2. Got: {}".format(response.data['username'])

    def test_create_manager_as_super(self):
        """POST /api/users/ returns 201 Created and data """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-list")

        data = {
            "username": "manager2",
            "email": "manager2@seller.com",
            "password": "edico123",
            "is_manager": True,
            "organization": 1
        }

        response = self.client.post(url, data)
        assert response.status_code == 201, \
            "Expected 201 Created. Got: {}".format(response.status_code)

        data_size = len(response.data)
        assert data_size == 4, \
            "Expected 4 fields. Got: {}".format(data_size)

        assert response.data['id'] == 5, \
            "Expected ID: 5. Got: {}".format(response.data['id'])

        assert response.data['username'] == "manager2", \
            "Expected username: manager. Got: {}".format(response.data['username'])

#-------------------------------------- EDIT
    def test_edit_self(self):
        """PATCH /api/users/:id/ returns 200 OK and data """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "email": "newemail@seller.com"
        }

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.patch(url, data)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        assert response.data['email'] == "newemail@seller.com", \
            "Expected email: newemail@seller.com. Got: {}".format(response.data['email'])

    def test_edit_others(self):
        """PATCH /api/users/:id/ returns 403 Forbidden and error """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "email": "newemail@seller.com"
        }

        url = reverse("user-detail", args=[self.superseller.pk])
        response = self.client.patch(url, data)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

        assert response.data['detail'] == "You do not have permission to perform this action.", \
            "Expected 'You do not have permission to perform this action.' error message. Got: {}".format(response.data['detail'])

    def test_edit_others_as_super(self):
        """PATCH /api/users/:id/ returns 200 OK and data """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "email": "superemail@seller.com"
        }

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.patch(url, data)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        assert response.data['email'] == "superemail@seller.com", \
            "Expected email: superemail@seller.com. Got: {}".format(response.data['email'])

    def test_edit_others_as_manager(self):
        """PATCH /api/users/:id/ returns 200 OK and data """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "email": "manageremail@seller.com"
        }

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.patch(url, data)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        assert response.data['email'] == "manageremail@seller.com", \
            "Expected email: manageremail@seller.com. Got: {}".format(response.data['email'])

#-------------------------------------- DELETE
    def test_delete(self):
        """ DELETE /api/users/:id/ returns 403 Forbidden """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.delete(url)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

    def test_delete_as_super(self):
        """ DELETE /api/users/:id/ returns 200 OK """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.delete(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

    def test_delete_as_manager(self):
        """ DELETE /api/users/:id/ returns 200 OK """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-detail", args=[self.seller.pk])
        response = self.client.delete(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

#-------------------------------------- SET_PASSWORD
    def test_set_password_self(self):
        """PUT /api/users/:id/set_password/ returns 200 OK and data """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "old_password": "edico123",
            "new_password": "newedico123"
        }

        url = reverse("user-set-password", args=[self.seller.pk])
        response = self.client.put(url, data)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)
    
    def test_set_password_others(self):
        """PUT /api/users/:id/set_password/ returns 403 Forbidden """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "new_password": "newedico123"
        }

        url = reverse("user-set-password", args=[self.superseller.pk])
        response = self.client.put(url, data)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

    def test_set_password_others_as_super(self):
        """PUT /api/users/:id/set_password/ returns 200 OK """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "new_password": "newedico123"
        }

        url = reverse("user-set-password", args=[self.seller.pk])
        response = self.client.put(url, data)

        assert response.status_code == 200, \
            "Expected 200 Ok. Got: {}".format(response.status_code)

    def test_set_password_others_as_manager(self):
        """PUT /api/users/:id/set_password/ returns 200 OK """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            "new_password": "newedico123"
        }

        url = reverse("user-set-password", args=[self.seller.pk])
        response = self.client.put(url, data)

        assert response.status_code == 200, \
            "Expected 200 Ok. Got: {}".format(response.status_code)

#-------------------------------------- ACTIVATE/DEACTIVATE
    def test_activate(self):
        """POST /api/users/:id/activate/ returns 403 Forbidden """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-activate", args=[self.inactive.pk])
        response = self.client.post(url)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

    def test_activate_as_super(self):
        """POST /api/users/:id/activate/ returns 200 OK """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-activate", args=[self.inactive.pk])
        response = self.client.post(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

    def test_activate_as_manager(self):
        """POST /api/users/:id/activate/ returns 200 OK """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-activate", args=[self.inactive.pk])
        response = self.client.post(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

    def test_deactivate(self):
        """POST /api/users/:id/deactivate/ returns 403 Forbidden """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-deactivate", args=[self.seller.pk])
        response = self.client.post(url)

        assert response.status_code == 403, \
            "Expected 403 Forbidden. Got: {}".format(response.status_code)

    def test_deactivate_as_super(self):
        """POST /api/users/:id/deactivate/ returns 200 OK """
        self.client.login(username="superseller", password="edico123")

        token = Token.objects.get(user__username='superseller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-deactivate", args=[self.seller.pk])
        response = self.client.post(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

    def test_deactivate_as_manager(self):
        """POST /api/users/:id/deactivate/ returns 200 OK """
        self.client.login(username="manager", password="edico123")

        token = Token.objects.get(user__username='manager')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("user-deactivate", args=[self.seller.pk])
        response = self.client.post(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)


    def tearDown(self):
        for user in User.objects.all():
            user.delete()
        for organization in Organization.objects.all():
            organization.delete()

        return super().tearDown()


class OrganizationTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.org_seller = Organization.objects.create(name="Seller Organization", is_seller=True)
        self.org_buyer = Organization.objects.create(name="Buyer Organization", is_seller=False)

        self.seller = User.objects.create_user(username="seller", email="seller@email.com", password="edico123", organization=self.org_seller)
        self.superseller = User.objects.create_superuser(username="superseller", email="superseller@email.com", password="edico123", organization=self.org_seller)
        self.manager = User.objects.create_user(username="manager", password="edico123", is_manager=True, organization=self.org_seller)

        self.buyer = User.objects.create_user(username="buyer", email="buyer@email.com", password="edico123", organization=self.org_buyer)

        return super().setUp()

#-------------------------------------- GET
    def test_get_organizations(self):
        """GET /api/organizations/ returns 200 OK """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("organization-list")
        response = self.client.get(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

        body = response.json()['results']
        assert len(body) == 1, \
            "Expected 1 results. Got: {}".format(len(body))

    def test_get_organization_detail(self):
        """GET /api/organizations/:id/ returns 200 OK """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("organization-detail", args=[self.org_seller.pk])
        response = self.client.get(url)

        assert response.status_code == 200, \
            "Expected 200 OK. Got: {}".format(response.status_code)

    def test_get_organization_data_filter(self):
        """GET /api/organizations/:id/ returns 404 Not Found """
        self.client.login(username="seller", password="edico123")

        token = Token.objects.get(user__username='seller')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        url = reverse("organization-detail", args=[self.org_buyer.pk])
        response = self.client.get(url)

        assert response.status_code == 404, \
            "Expected 404 Not Found. Got: {}".format(response.status_code)

#-------------------------------------- CREATE
    def test_create_organization(self):
        """POST /api/organizations/ returns 403 Forbidden """

        return 0

    def tearDown(self):
        for user in User.objects.all():
            user.delete()
        for organization in Organization.objects.all():
            organization.delete()

        return super().tearDown()