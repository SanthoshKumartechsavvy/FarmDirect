# Generated by Django 5.1 on 2024-08-22 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farmdirect', '0005_alter_userprofile_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='max_otp_try',
            field=models.IntegerField(default=3),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='role',
            field=models.CharField(choices=[('farmer', 'Farmer'), ('buyer', 'Buyer')], default='farmer', max_length=10),
        ),
    ]
