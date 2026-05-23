from django.urls import include, path
from rest_framework.routers import DefaultRouter

from app.api.views import HealthCheckView


router = DefaultRouter()

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('v1/', include(router.urls)),
    path('v1/academics/', include('apps.academics.urls')),
    path('v1/athletics/', include('apps.athletics.urls')),
    path('v1/campus/', include('apps.campus.urls')),
]
