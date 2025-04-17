from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    path('exchange/', include('ExchangeRateApi.urls')),
    path('danh_muc_san_pham/', include('danh_muc_san_pham.urls')),
    
]
