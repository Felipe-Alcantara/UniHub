from django.contrib import admin

from apps.accounts.models import AccessProfile


@admin.register(AccessProfile)
class AccessProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile', 'role_label', 'registration')
    list_filter = ('profile',)
    search_fields = ('user__username', 'user__email', 'role_label')
