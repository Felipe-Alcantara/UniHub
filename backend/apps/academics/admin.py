from django.contrib import admin

from apps.academics.models import CourseLink, Deadline, Notice, Subject


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'priority', 'published_at', 'is_active')
    list_filter = ('category', 'priority', 'is_active')
    search_fields = ('title', 'body')


@admin.register(Deadline)
class DeadlineAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'due_at', 'status')
    list_filter = ('status', 'subject')
    search_fields = ('title', 'subject')


@admin.register(CourseLink)
class CourseLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher', 'room', 'progress')
    search_fields = ('name', 'teacher', 'room')
