# Generated by Django 3.0.3 on 2020-02-24 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200224_1511'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='super',
        ),
    ]