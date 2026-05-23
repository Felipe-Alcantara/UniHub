from rest_framework.routers import DefaultRouter

from apps.campus.views import CampusBlockViewSet, CampusRoomViewSet


router = DefaultRouter()
router.register('blocks', CampusBlockViewSet, basename='campus-block')
router.register('rooms', CampusRoomViewSet, basename='campus-room')

urlpatterns = router.urls
