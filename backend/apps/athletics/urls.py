from rest_framework.routers import DefaultRouter

from apps.athletics.views import AthleticEventViewSet, BoardTaskViewSet, TrainingViewSet


router = DefaultRouter()
router.register('trainings', TrainingViewSet, basename='training')
router.register('events', AthleticEventViewSet, basename='athletic-event')
router.register('board-tasks', BoardTaskViewSet, basename='board-task')

urlpatterns = router.urls
