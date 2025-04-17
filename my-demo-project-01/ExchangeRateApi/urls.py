from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.get_exchange_rate, name='exchange_rate'),
]