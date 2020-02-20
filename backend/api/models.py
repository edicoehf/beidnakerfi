from django.db import models
from django.contrib.auth.models import User

from django.db.models import signals
from tastypie.models import create_api_key

signals.post_save.connect(create_api_key, sender=User)

# Create your models here.
class Privileges(models.Model):
    description = models.CharField(max_length=20)

    class Meta:
        db_table = 'privileges'

class Buyers(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'buyers'

class Departments(models.Model):
    name = models.CharField(max_length=50)
    costsite = models.CharField(max_length=50)
    bid = models.ForeignKey('Buyers', on_delete=models.CASCADE)

    class Meta:
        db_table = 'departments'

class Sellers(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'sellers'

class Cheques(models.Model):
    price = models.FloatField()
    description = models.CharField(max_length=200)
    buid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buid')
    suid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suid')
    did = models.ForeignKey('Departments', on_delete=models.CASCADE)

    class Meta:
        db_table = 'cheques'