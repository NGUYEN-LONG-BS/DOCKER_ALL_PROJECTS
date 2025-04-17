from django.urls import path
from . import views

urlpatterns = [
    path('', views.danh_muc_san_pham, name='danh_muc_san_pham'),
    path('add-product/', views.add_product, name='add_product'),
]