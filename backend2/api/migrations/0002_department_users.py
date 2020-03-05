# Generated by Django 3.0.3 on 2020-03-05 14:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='department',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
