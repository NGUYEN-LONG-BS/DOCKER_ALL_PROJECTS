from django.urls import path
from .views import FormSubmissionView, LoginInfoListView, TBInventoryCategoriesView
# from .views import SaveInventoryView
from .views import InventoryStockReceivedIssuedReturnedView
from .views import get_json_data, download_file_IMPORT_TEMPLATE, download_file_PRINT_TEMPLATE, import_data
from .views import MaxSoPhieuView
from .views import CheckSoPhieuExistView
from .views import InventoryStockListView
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
    
    path('save-inventory/', InventoryStockReceivedIssuedReturnedView.as_view(), name='save-inventory'),
    path('download-import-template/', download_file_IMPORT_TEMPLATE, name='download_file'),
    path('download-print-template/', download_file_PRINT_TEMPLATE, name='download_file'),
    path('import-data/', import_data, name='import_data'),
    
    path('new-number-slip-pnk/', MaxSoPhieuView.as_view(), name='new-number-slip-pnk'),
    path('check-so-phieu/', CheckSoPhieuExistView.as_view(), name='check-so-phieu'),
    path('inventory-stock/', InventoryStockListView.as_view(), name='inventory_stock_list'),
]

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files