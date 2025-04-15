from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include('blog.urls')),
    # Bao gồm các URL từ ứng dụng 'blog'
    path('blog/', include('blog.urls')),  # Đưa vào đường dẫn blog/
]
