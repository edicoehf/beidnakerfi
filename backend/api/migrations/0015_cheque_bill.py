# Generated by Django 3.0.3 on 2020-05-03 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20200430_1646'),
    ]

    operations = [
        migrations.AddField(
            model_name='cheque',
            name='invoice',
            field=models.CharField(null=True, max_length=50, verbose_name='ID for invoice (optional)'),
        ),
    ]