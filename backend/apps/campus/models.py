from django.db import models


class CampusBlock(models.Model):
    code = models.CharField(max_length=12, unique=True)
    name = models.CharField(max_length=120)
    block_type = models.CharField(max_length=120)
    floor_info = models.CharField(max_length=80)
    map_position = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['code']

    def __str__(self):
        return self.name


class CampusRoom(models.Model):
    block = models.ForeignKey(CampusBlock, related_name='rooms', on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    floor = models.CharField(max_length=40)
    room_type = models.CharField(max_length=80)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['block__code', 'floor', 'name']

    def __str__(self):
        return f'{self.block.code}-{self.name}'
