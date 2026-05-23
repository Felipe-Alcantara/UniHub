from rest_framework import serializers

from apps.campus.models import CampusBlock, CampusRoom


class CampusRoomSerializer(serializers.ModelSerializer):
    block_code = serializers.CharField(source='block.code', read_only=True)

    class Meta:
        model = CampusRoom
        fields = ['id', 'block', 'block_code', 'name', 'floor', 'room_type', 'description']


class CampusBlockSerializer(serializers.ModelSerializer):
    rooms = CampusRoomSerializer(many=True, read_only=True)

    class Meta:
        model = CampusBlock
        fields = ['id', 'code', 'name', 'block_type', 'floor_info', 'map_position', 'rooms']
