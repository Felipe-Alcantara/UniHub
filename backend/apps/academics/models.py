from django.db import models


class Notice(models.Model):
    PRIORITY_CHOICES = [
        ('urgent', 'Urgente'),
        ('warning', 'Atencao'),
        ('info', 'Informativo'),
        ('success', 'Concluido'),
    ]

    title = models.CharField(max_length=160)
    body = models.TextField()
    category = models.CharField(max_length=80)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='info')
    published_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class Deadline(models.Model):
    STATUS_CHOICES = [
        ('open', 'Aberto'),
        ('submitted', 'Enviado'),
        ('late', 'Atrasado'),
    ]

    title = models.CharField(max_length=160)
    subject = models.CharField(max_length=120)
    due_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_at']

    def __str__(self):
        return f'{self.title} - {self.subject}'


class CourseLink(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=80)
    url = models.URLField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['category', 'title']

    def __str__(self):
        return self.title


class Subject(models.Model):
    name = models.CharField(max_length=140)
    teacher = models.CharField(max_length=120)
    room = models.CharField(max_length=80)
    progress = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
