from rest_framework import serializers

from apps.athletics.models import AthleticEvent, BoardTask, Training


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = ['id', 'sport', 'weekday', 'time', 'place', 'is_active']


class AthleticEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AthleticEvent
        fields = ['id', 'title', 'event_type', 'date', 'place', 'status']


class BoardTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardTask
        fields = ['id', 'area', 'task', 'owner', 'status', 'created_at']
