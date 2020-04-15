# Generated by Django 3.0.3 on 2020-03-30 15:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200330_1532'),
    ]

    operations = [
        migrations.AddField(
            model_name='cheque',
            name='seller',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Organization'),
        ),
        migrations.AlterField(
            model_name='cheque',
            name='status',
            field=models.IntegerField(choices=[(0, 'Cancelled'), (1, 'Created'), (2, 'Pending'), (3, 'Done')], default=1, verbose_name='Status'),
        ),
    ]