from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations, models
import django.db.models.deletion


DEMO_PASSWORD = 'Atletiza@2026'
DEMO_ACCOUNTS = [
    ('aluno@exemple.com', 'Gabriel', 'Fernandes', 'student', 'Aluno / Atleta'),
    ('diretoria@exemple.com', 'Ana', 'Souza', 'board', 'Diretora de Esportes'),
    ('admin@exemple.com', 'Felipe', 'Admin', 'admin', 'Dev/Admin'),
]


def seed_demo_accounts(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    AccessProfile = apps.get_model('accounts', 'AccessProfile')

    for email, first_name, last_name, profile, role_label in DEMO_ACCOUNTS:
        user, _ = User.objects.update_or_create(
            username=email,
            defaults={
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'password': make_password(DEMO_PASSWORD),
                'is_active': True,
            },
        )
        AccessProfile.objects.update_or_create(
            user=user,
            defaults={'profile': profile, 'role_label': role_label},
        )


def remove_demo_accounts(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    User.objects.filter(username__in=[account[0] for account in DEMO_ACCOUNTS]).delete()


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AccessProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile', models.CharField(choices=[('student', 'Aluno'), ('board', 'Diretoria'), ('admin', 'Admin')], max_length=20, unique=True)),
                ('role_label', models.CharField(max_length=80)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='access_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RunPython(seed_demo_accounts, remove_demo_accounts),
    ]
