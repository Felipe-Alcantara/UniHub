from rest_framework import serializers

from apps.academics.models import CourseLink, Deadline, Notice, Subject


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id', 'title', 'body', 'category', 'priority', 'published_at', 'is_active']


class DeadlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deadline
        fields = ['id', 'title', 'subject', 'due_at', 'status', 'created_at']


class CourseLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLink
        fields = ['id', 'title', 'description', 'category', 'url', 'is_active']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'teacher', 'room', 'progress']
