from django.db import models
from django.contrib.auth.models import User

from django.db.models import signals
from tastypie.models import create_api_key
from django.dispatch import receiver

signals.post_save.connect(create_api_key, sender=User)

# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=50)
    buyer_seller = models.BooleanField()
    
    class Meta:
        db_table = 'organization'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    org_id = models.ForeignKey('Organization', null=True, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'user'

@receiver(signals.post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
     if created:
        if hasattr(instance, '_org_id'):
            Profile.objects.create(user=instance, org_id=Organization.objects.get(id=instance._org_id))
        else:
            Profile.objects.create(user=instance, org_id=None)

@receiver(signals.post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Department(models.Model):
    name = models.CharField(max_length=50)
    costsite = models.CharField(max_length=50)
    org_id = models.ForeignKey('Organization', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='departments')
    
    class Meta:
        db_table = 'department'

class Cheques(models.Model):
    price = models.FloatField()
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=20)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cheque_user_id')
    dep_id = models.ForeignKey('Department', on_delete=models.CASCADE, related_name='cheque_dep_id')

    class Meta:
        db_table = 'cheques'
