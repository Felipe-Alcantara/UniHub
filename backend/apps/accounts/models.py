from django.conf import settings
from django.db import models


class AccessProfile(models.Model):
    PROFILE_CHOICES = [
        ('student', 'Aluno'),
        ('board', 'Diretoria'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='access_profile')
    profile = models.CharField(max_length=20, choices=PROFILE_CHOICES)
    role_label = models.CharField(max_length=80)
    registration = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f'{self.user.email} - {self.role_label}'
