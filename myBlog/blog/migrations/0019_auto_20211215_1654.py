# Generated by Django 3.1.5 on 2021-12-15 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0018_useremail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useremail',
            name='Email',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]