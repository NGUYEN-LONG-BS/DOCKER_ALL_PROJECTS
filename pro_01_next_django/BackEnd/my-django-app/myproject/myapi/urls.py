from django.urls import path
from .views import FormSubmissionView, LoginInfoListView
from . import views

urlpatterns = [
    path('submit-form/', FormSubmissionView.as_view(), name='submit-form'),
    path('submit-login-info/', views.submit_login_info, name='submit-login-info'),
    path('get-login-info/', LoginInfoListView.as_view(), name='get-login-info'),  # Thêm đường dẫn API GET
]
