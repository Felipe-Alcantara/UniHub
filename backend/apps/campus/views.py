from rest_framework.viewsets import ReadOnlyModelViewSet

from apps.campus.models import CampusBlock, CampusRoom
from apps.campus.serializers import CampusBlockSerializer, CampusRoomSerializer


class CampusBlockViewSet(ReadOnlyModelViewSet):
    queryset = CampusBlock.objects.prefetch_related('rooms')
    serializer_class = CampusBlockSerializer


class CampusRoomViewSet(ReadOnlyModelViewSet):
    queryset = CampusRoom.objects.select_related('block')
    serializer_class = CampusRoomSerializer
