from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('django_guidance/', views.django_guidance, name='django_guidance'),
    
    path('blog/', views.blog_list, name='blog_list'),  # Đường dẫn tới danh sách bài viết
    path('blog/<int:id>/', views.blog_detail, name='blog_detail'),  # Đường dẫn chi tiết bài viết
    path('blog/add/', views.add_blog, name='add_blog'),  # Đường dẫn đến trang nhập liệu
    path('edit/<int:id>/', views.edit_blog, name='edit_blog'),  # Đường dẫn chỉnh sửa bài viết
    
]
