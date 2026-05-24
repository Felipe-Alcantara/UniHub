from django.contrib.auth.hashers import make_password
from django.db import migrations, models


DEMO_PASSWORD = 'Atletiza@2026'
PARTICIPANT_ACCOUNTS = [
    ('gabriel@atletiza.com', 'Gabriel', 'Fernandes', '202612345'),
    ('julia@atletiza.com', 'Júlia', 'de Oliveira Martins', '2025101351'),
    ('andre@atletiza.com', 'André', 'Gustavo Melo da Silva', '2023121370'),
    ('luiz.filipe@atletiza.com', 'Luiz', 'Filipe Silva Rocha', '2025101510'),
]


def seed_participant_accounts(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    AccessProfile = apps.get_model('accounts', 'AccessProfile')

    for email, first_name, last_name, registration in PARTICIPANT_ACCOUNTS:
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
            defaults={
                'profile': 'student',
                'role_label': 'Aluno / Atleta',
                'registration': registration,
            },
        )


def remove_participant_accounts(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    User.objects.filter(username__in=[account[0] for account in PARTICIPANT_ACCOUNTS]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accessprofile',
            name='profile',
            field=models.CharField(choices=[('student', 'Aluno'), ('board', 'Diretoria'), ('admin', 'Admin')], max_length=20),
        ),
        migrations.AddField(
            model_name='accessprofile',
            name='registration',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.RunPython(seed_participant_accounts, remove_participant_accounts),
    ]
