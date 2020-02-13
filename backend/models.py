from django.db import models

# Create your models here.
class Privileges(models.Model):
    description = models.CharField(max_length=20)

class Buyers(models.Model):
    name = models.CharField(max_length=50)

class Departments(models.Model):
    name = models.CharField(max_length=50)
    costsite = models.CharField(max_length=50)
    bid = models.ForeignKey('Buyers', on_delete=models.CASCADE)

class BuyerUsers(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    bid = models.ForeignKey('Buyers', on_delete=models.CASCADE)
    pid = models.ForeignKey('Privileges', on_delete=models.CASCADE)

class Sellers(models.Model):
    name = models.CharField(max_length=50)

class SellerUsers(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    sid = models.ForeignKey('Sellers', on_delete=models.CASCADE)
    pid = models.ForeignKey('Privileges', on_delete=models.CASCADE)


class Cheques(models.Model):
    price = models.FloatField()
    description = models.CharField(max_length=200)
    buid = models.ForeignKey('BuyerUsers', on_delete=models.CASCADE)
    suid = models.ForeignKey('SellerUsers', on_delete=models.CASCADE)
    did = models.ForeignKey('Departments', on_delete=models.CASCADE)