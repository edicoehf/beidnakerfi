from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

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
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    superuser = models.BooleanField(("Super User"))

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

class Cheque(models.Model):
    # Constants for choice integers defined to avoid magic number usage
    CREATED = 0
    PENDING = 1
    DONE = 2
    STATUS_CHOICES = (
        (CREATED, 'Created'),
        (PENDING, 'Pending'),
        (DONE, 'Done')
    )
    status = models.IntegerField(("Status"), choices=STATUS_CHOICES, default=CREATED)

    description = models.CharField(("Placeholder for cheque information fields"), max_length=200)
    price = models.FloatField(("Price"))
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="cheque_user", on_delete=models.CASCADE)
    department = models.ForeignKey(Department, related_name="cheque_department", on_delete=models.CASCADE)

    # Alternate solution to auto_now and auto_now_add due to update errors
    # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
    created = models.DateTimeField(("Cheque created"), editable=False)
    modified = models.DateTimeField(("Last modified"))

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Cheque, self).save(*args, **kwargs)