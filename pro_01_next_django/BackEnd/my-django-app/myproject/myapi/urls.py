from django.urls import path
from .views import FormSubmissionView, LoginInfoListView, TBInventoryCategoriesView
from .views import get_json_data
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('submit-form/', FormSubmissionView.as_view(), name='submit-form'),
    path('submit-login-info/', views.submit_login_info, name='submit-login-info'),
    path('get-login-info/', LoginInfoListView.as_view(), name='get-login-info'),
    
    path('submit-inventory-categories/', views.submit_inventory_categories, name='submit-inventory-categories'),
    path('get-inventory-categories/', TBInventoryCategoriesView.as_view(), name='get-inventory-categories'),
    path('get-json-data/', get_json_data, name='get-json-data'),
    # path('get-json-data/<str:file_path>/', get_json_data, name='get-json-data'),
]

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files