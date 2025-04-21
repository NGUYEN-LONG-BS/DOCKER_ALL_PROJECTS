from django.urls import path
from .views import FormSubmissionView
from . import views

urlpatterns = [
    path('submit-form/', FormSubmissionView.as_view(), name='submit-form'),
    path('submit-login-info/', views.submit_login_info, name='submit-login-info'),
]
