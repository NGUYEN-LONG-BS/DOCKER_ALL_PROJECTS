"""
URL configuration for tuan_an_group project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dashboard import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('template_01/', views.template_01, name='template_01'),
    path('home/', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register, name='register'),
    path('DashboardAllDepartment/', views.DashboardAllDepartment, name='DashboardAllDepartment'),
    path('DashboardBPVatTu/', views.DashboardBPVatTu, name='DashboardBPVatTu'),
    
    path('inventory/', views.inventory, name='inventory'),
    
    path('DashboardBPKinhDoanh/', views.DashboardBPKinhDoanh, name='DashboardBPKinhDoanh'),
    path('DashboardBPKho/', views.DashboardBPKho, name='DashboardBPKho'),
    path('DashboardBPKyThuat/', views.DashboardBPKyThuat, name='DashboardBPKyThuat'),
    path('DashboardBPNhanSu/', views.DashboardBPNhanSu, name='DashboardBPNhanSu'),
    path('DashboardBPTaiChinh/', views.DashboardBPTaiChinh, name='DashboardBPTaiChinh'),
]

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files
    