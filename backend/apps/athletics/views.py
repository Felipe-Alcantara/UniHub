from rest_framework.viewsets import ReadOnlyModelViewSet

from apps.athletics.models import AthleticEvent, BoardTask, Training
from apps.athletics.serializers import AthleticEventSerializer, BoardTaskSerializer, TrainingSerializer


class TrainingViewSet(ReadOnlyModelViewSet):
    serializer_class = TrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(is_active=True)


class AthleticEventViewSet(ReadOnlyModelViewSet):
    queryset = AthleticEvent.objects.all()
    serializer_class = AthleticEventSerializer


class BoardTaskViewSet(ReadOnlyModelViewSet):
    queryset = BoardTask.objects.all()
    serializer_class = BoardTaskSerializer
