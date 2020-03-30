# Generated by Django 3.0.3 on 2020-03-30 14:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_cheque'),
    ]

    operations = [
        migrations.AddField(
            model_name='cheque',
            name='code',
            field=models.CharField(default=696969696969696969, max_length=20, unique=True, verbose_name='Cheque code'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_buyer', to='api.Organization')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_seller', to='api.Organization')),
            ],
        ),
    ]
