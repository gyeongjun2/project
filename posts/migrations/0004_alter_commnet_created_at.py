# Generated by Django 4.2.3 on 2023-07-09 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_post_writer_alter_post_created_at_alter_post_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commnet',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='작성일'),
        ),
    ]
