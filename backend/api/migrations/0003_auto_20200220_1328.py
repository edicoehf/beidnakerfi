# Generated by Django 3.0.3 on 2020-02-20 13:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_auto_20200213_1612'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sellerusers',
            name='pid',
        ),
        migrations.RemoveField(
            model_name='sellerusers',
            name='sid',
        ),
        migrations.AlterField(
            model_name='cheques',
            name='buid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buid', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='cheques',
            name='suid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='suid', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='BuyerUsers',
        ),
        migrations.DeleteModel(
            name='SellerUsers',
        ),
    ]