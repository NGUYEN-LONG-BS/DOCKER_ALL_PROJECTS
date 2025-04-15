from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('django_guidance/', views.django_guidance, name='django_guidance'),
]
