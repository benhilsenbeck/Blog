# Generated by Django 3.2.2 on 2021-06-08 20:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_auto_20210608_2042'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='users',
            name='is_staff',
        ),
    ]