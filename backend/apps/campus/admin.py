from django.contrib import admin

from apps.campus.models import CampusBlock, CampusRoom


class CampusRoomInline(admin.TabularInline):
    model = CampusRoom
    extra = 0


@admin.register(CampusBlock)
class CampusBlockAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'block_type', 'floor_info')
    search_fields = ('code', 'name', 'block_type')
    inlines = [CampusRoomInline]


@admin.register(CampusRoom)
class CampusRoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'block', 'floor', 'room_type')
    list_filter = ('block', 'floor', 'room_type')
    search_fields = ('name', 'description')
