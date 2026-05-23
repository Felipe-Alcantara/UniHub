from django.db import models


class Training(models.Model):
    sport = models.CharField(max_length=80)
    weekday = models.CharField(max_length=80)
    time = models.TimeField()
    place = models.CharField(max_length=120)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sport', 'weekday']

    def __str__(self):
        return f'{self.sport} - {self.weekday}'


class AthleticEvent(models.Model):
    EVENT_TYPE_CHOICES = [
        ('friendly', 'Amistoso'),
        ('tournament', 'Torneio'),
        ('tryout', 'Seletiva'),
        ('meeting', 'Reuniao'),
    ]

    title = models.CharField(max_length=160)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES)
    date = models.DateTimeField()
    place = models.CharField(max_length=120)
    status = models.CharField(max_length=80)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.title


class BoardTask(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('in_progress', 'Em andamento'),
        ('done', 'Concluido'),
    ]

    area = models.CharField(max_length=100)
    task = models.CharField(max_length=180)
    owner = models.CharField(max_length=120)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['status', '-created_at']

    def __str__(self):
        return self.task
