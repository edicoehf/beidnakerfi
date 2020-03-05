from django.db import models

# User
from django.contrib.auth.models import User

# Auth token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Organization(models.Model):
    name = models.CharField(("Organization name"), max_length=50, unique=True)
    is_seller = models.BooleanField(("Organization Seller?"))

class Department(models.Model):
    name = models.CharField(("Department name"), max_length=50)
    costsite = models.CharField(("Costsite"), max_length=50)
    organization = models.ForeignKey(Organization, related_name="departments", on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name="department_user")

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        profile, created = UserProfile.objects.get_or_create(user=instance)
        # >>> user = User.objects.get(username='ingi')
        # >>> ingi_department = user.userprofile.organization

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.OneToOneField(Organization, on_delete=models.CASCADE)