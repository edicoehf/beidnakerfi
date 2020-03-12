from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# AUTH TOKEN
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Organization(models.Model):
    name = models.CharField(("Organization name"), max_length=50, unique=True)
    is_seller = models.BooleanField(("Seller?"))

    def __str__(self):
        return self.name

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True)
    #### REMOVE NULL=TRUE AFTER INITIAL LOGIN AND ORG CREATE ####

    def __str__(self):
        return self.username

class Department(models.Model):
    name = models.CharField(("Department name"), max_length=50)
    costsite = models.CharField(("Costsite"), max_length=50)
    organization = models.ForeignKey(Organization, related_name="departments", on_delete=models.CASCADE)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="department_user")

    def __str__(self):
        return self.name

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        # profile, created = UserProfile.objects.get_or_create(user=instance, organization=instance.userprofile.organization)
        # >>> user = User.objects.get(username='ingi')
        # >>> ingi_department = user.userprofile.organization