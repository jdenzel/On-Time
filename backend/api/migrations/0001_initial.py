# Generated by Django 4.2.11 on 2024-04-09 00:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeClock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('clock_in_time', models.TimeField(auto_now_add=True)),
                ('clock_out_time', models.TimeField(blank=True, null=True)),
                ('location', models.CharField(blank='true', default='none', max_length=50)),
                ('role', models.CharField(choices=[('scoreboard', 'Scoreboard'), ('paperscorer', 'Paper Scorer'), ('camera', 'Camera Operator'), ('onlinescorer', 'Online Scorer'), ('gamechange', 'Game Changer'), ('subtime', 'Sub timer')], default='none', max_length=20)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
