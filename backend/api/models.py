from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

# AUTH TOKEN
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# EMAIL
from .email import send_email


class Organization(models.Model):
    name = models.CharField(("Organization name"), max_length=50, unique=True)
    is_seller = models.BooleanField(("Seller?"))

    def __str__(self):
        return self.name


class Client(models.Model):
    buyer = models.ForeignKey(
        Organization, related_name="client_buyer", on_delete=models.CASCADE)
    seller = models.ForeignKey(
        Organization, related_name="client_seller", on_delete=models.CASCADE)

    def __str__(self):
        return "{}: {}".format(self.buyer, self.seller)


class User(AbstractUser):
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, null=True)
    is_manager = models.BooleanField(("Department manager"), default=False)

    def __str__(self):
        return self.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    # Signal to create auth token after user create
    if created:
        Token.objects.create(user=instance)


class Department(models.Model):
    name = models.CharField(("Department name"), max_length=50)
    costsite = models.CharField(("Costsite"), max_length=50)
    organization = models.ForeignKey(
        Organization, related_name="departments", on_delete=models.CASCADE)
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="department_user")

    def __str__(self):
        return self.name


class Cheque(models.Model):
    # Constants for choice integers to avoid magic number usage
    CANCELLED = 0
    CREATED = 1
    PENDING = 2
    DONE = 3
    STATUS_CHOICES = (
        (CANCELLED, 'Cancelled'),
        (CREATED, 'Created'),
        (PENDING, 'Pending'),
        (DONE, 'Done')
    )
    status = models.IntegerField(
        ("Status"), choices=STATUS_CHOICES, default=CREATED)

    code = models.CharField(("Cheque code"), unique=True, max_length=20)
    description = models.CharField(
        ("Placeholder for cheque information fields"), max_length=200)
    price = models.FloatField(("Price"))
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="cheque_user", on_delete=models.CASCADE)
    department = models.ForeignKey(
        Department, related_name="cheque_department", on_delete=models.CASCADE)
    seller = models.ForeignKey(
        Organization, related_name="cheque_organization", on_delete=models.CASCADE, null=True)
    invoice = models.CharField(
        ("ID for invoice (optional)"), max_length=50, null=True)

    # Alternate solution to auto_now and auto_now_add due to update errors
    # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
    created = models.DateTimeField(("Cheque created"), editable=False)
    modified = models.DateTimeField(("Last modified"))

    def __str__(self):
        return "{}: {}".format(self.id, self.code)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Cheque, self).save(*args, **kwargs)


@receiver(post_save, sender=Cheque)
def email_init(sender, instance, created=False, **kwargs):
    if created:
        title = "Beiðni skráð - {0}".format(instance.code)
        body = "Nýskráning beiðnar tókst.\nEkki vera spamfilteraður pls\nID: {0}".format(
            instance.code)

        # UNCOMMENT TO ENABLE EMAIL
        # response = send_email(instance.user.email, title, body)
        # print(response.text)
        # print(response.status_code)
