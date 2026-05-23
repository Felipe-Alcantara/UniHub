from django.contrib import admin

from apps.athletics.models import AthleticEvent, BoardTask, Training


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('sport', 'weekday', 'time', 'place', 'is_active')
    list_filter = ('sport', 'is_active')
    search_fields = ('sport', 'place')


@admin.register(AthleticEvent)
class AthleticEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_type', 'date', 'status')
    list_filter = ('event_type', 'status')
    search_fields = ('title',)


@admin.register(BoardTask)
class BoardTaskAdmin(admin.ModelAdmin):
    list_display = ('area', 'task', 'owner', 'status')
    list_filter = ('area', 'status')
    search_fields = ('task', 'owner')
