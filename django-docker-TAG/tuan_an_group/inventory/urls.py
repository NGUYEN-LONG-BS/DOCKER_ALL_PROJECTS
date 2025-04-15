from django.contrib import admin
from django.urls import path
from dashboard import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
]

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files
    