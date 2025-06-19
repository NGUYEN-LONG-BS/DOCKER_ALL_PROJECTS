from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import (
    FormSubmissionView,
    LoginInfoListView,
    TBInventoryCategoriesView,
    InventoryStockReceivedIssuedReturnedView,
    get_json_data,
    download_file_IMPORT_TEMPLATE,
    download_file_PRINT_TEMPLATE,
    import_data,
    MaxSoPhieuView,
    CheckSoPhieuExistView,
    InventoryStockListView,
    CheckMaHangExistView,
    InventoryStockBySoPhieuView,
    check_login,
    import_bulk_data_TB_INVENTORY_CATEGORIES,
    import_bulk_data_TB_CLIENT_CATEGORIES,
    UserPermissionViewSet,
    get_data_TB_CLIENT_CATEGORIES,
)
from .views_LA import import_bulk_data_LA_INVENTORY_CATEGORIES
from .views_PA import import_bulk_data_PA_INVENTORY_CATEGORIES
from .views_Ha_Noi import import_bulk_data_HANOI_INVENTORY_CATEGORIES
from .views_Mien_Tay import import_bulk_data_MIENTAY_INVENTORY_CATEGORIES
from .views_Nam_An import import_bulk_data_NAMAN_INVENTORY_CATEGORIES

router = DefaultRouter()
router.register(r'user-permissions', UserPermissionViewSet, basename='user-permission')

urlpatterns = [
    path('submit-form/', FormSubmissionView.as_view(), name='submit-form'),
    path('submit-login-info/', get_json_data, name='submit-login-info'),
    path('get-login-info/', LoginInfoListView.as_view(), name='get-login-info'),
    path('submit-inventory-categories/', get_json_data, name='submit-inventory-categories'),
    path('get-inventory-categories/', TBInventoryCategoriesView.as_view(), name='get-inventory-categories'),
    path('get-json-data/', get_json_data, name='get-json-data'),
    path('save-inventory/', InventoryStockReceivedIssuedReturnedView.as_view(), name='save-inventory'),
    path('download-import-template/', download_file_IMPORT_TEMPLATE, name='download_file'),
    path('download-print-template/', download_file_PRINT_TEMPLATE, name='download_file'),
    path('import-data/', import_data, name='import_data'),
    path('new-number-slip-pnk/', MaxSoPhieuView.as_view(), name='new-number-slip-pnk'),
    path('check-so-phieu/', CheckSoPhieuExistView.as_view(), name='check-so-phieu'),
    path('inventory-stock/', InventoryStockListView.as_view(), name='inventory_stock_list'),
    path('check-ma-hang/', CheckMaHangExistView.as_view(), name='check_ma_hang'),
    path('check-login/', check_login, name='check_login'),
    path('get-user-permission-info/', get_json_data, name='get_user_permission_info'),
    path('inventory-stock-by-so-phieu/', InventoryStockBySoPhieuView.as_view(), name='inventory_stock_by_so_phieu'),
    path('import_bulk_data_TB_INVENTORY_CATEGORIES/', import_bulk_data_TB_INVENTORY_CATEGORIES, name='import_bulk_data_TB_INVENTORY_CATEGORIES'),
    path('import_bulk_data_LA_INVENTORY_CATEGORIES/', import_bulk_data_LA_INVENTORY_CATEGORIES, name='import_bulk_data_LA_INVENTORY_CATEGORIES'),
    path('import_bulk_data_PA_INVENTORY_CATEGORIES/', import_bulk_data_PA_INVENTORY_CATEGORIES, name='import_bulk_data_PA_INVENTORY_CATEGORIES'),
    path('import_bulk_data_HANOI_INVENTORY_CATEGORIES/', import_bulk_data_HANOI_INVENTORY_CATEGORIES, name='import_bulk_data_HANOI_INVENTORY_CATEGORIES'),
    path('import_bulk_data_MIENTAY_INVENTORY_CATEGORIES/', import_bulk_data_MIENTAY_INVENTORY_CATEGORIES, name='import_bulk_data_MIENTAY_INVENTORY_CATEGORIES'),
    path('import_bulk_data_NAMAN_INVENTORY_CATEGORIES/', import_bulk_data_NAMAN_INVENTORY_CATEGORIES, name='import_bulk_data_NAMAN_INVENTORY_CATEGORIES'),
    path('get_data_TB_CLIENT_CATEGORIES/', get_data_TB_CLIENT_CATEGORIES.as_view(), name='get_data_TB_CLIENT_CATEGORIES'),
    path('import_bulk_data_TB_CLIENT_CATEGORIES/', import_bulk_data_TB_CLIENT_CATEGORIES, name='import_bulk_data_TB_CLIENT_CATEGORIES'),
]

urlpatterns += router.urls

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files