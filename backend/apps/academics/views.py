from rest_framework.viewsets import ReadOnlyModelViewSet

from apps.academics.models import CourseLink, Deadline, Notice, Subject
from apps.academics.serializers import (
    CourseLinkSerializer,
    DeadlineSerializer,
    NoticeSerializer,
    SubjectSerializer,
)


class NoticeViewSet(ReadOnlyModelViewSet):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        return Notice.objects.filter(is_active=True)


class DeadlineViewSet(ReadOnlyModelViewSet):
    queryset = Deadline.objects.all()
    serializer_class = DeadlineSerializer


class CourseLinkViewSet(ReadOnlyModelViewSet):
    serializer_class = CourseLinkSerializer

    def get_queryset(self):
        return CourseLink.objects.filter(is_active=True)


class SubjectViewSet(ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
