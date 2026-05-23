from rest_framework.routers import DefaultRouter

from apps.academics.views import CourseLinkViewSet, DeadlineViewSet, NoticeViewSet, SubjectViewSet


router = DefaultRouter()
router.register('notices', NoticeViewSet, basename='notice')
router.register('deadlines', DeadlineViewSet, basename='deadline')
router.register('course-links', CourseLinkViewSet, basename='course-link')
router.register('subjects', SubjectViewSet, basename='subject')

urlpatterns = router.urls
