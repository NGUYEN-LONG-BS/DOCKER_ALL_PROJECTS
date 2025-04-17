from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.danh_muc_san_pham, name='danh_muc_san_pham'),
]