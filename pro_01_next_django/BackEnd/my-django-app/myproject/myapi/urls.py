from django.urls import path, include
from .views import FormSubmissionView, LoginInfoListView, TBInventoryCategoriesView
# from .views import SaveInventoryView
from .views import InventoryStockReceivedIssuedReturnedView
from .views import get_json_data, download_file_IMPORT_TEMPLATE, download_file_PRINT_TEMPLATE, import_data
from .views import MaxSoPhieuView
from .views import CheckSoPhieuExistView
from .views import InventoryStockListView, CheckMaHangExistView
from .views import InventoryStockBySoPhieuView
from .views import check_login
from . import views
from django.conf import settings
from django.conf.urls.static import static
# ===========================================================================
from .views import import_bulk_data_to_all_INVENTORY_CATEGORIES
from .views import import_bulk_data_to_all_CLIENT_CATEGORIES
# ===========================================================================
from .views import TBClientCategoriesCreateView
from .views import GetNextMaKhachHangView
from .views import ExportTBClientCategoriesToExcel
from .views import UpdateXoaSuaView
# ===========================================================================
from rest_framework.routers import DefaultRouter
from .views import UserPermissionViewSet, get_data_TB_CLIENT_CATEGORIES

router = DefaultRouter()
router.register(r'user-permissions', UserPermissionViewSet, basename='user-permission')

urlpatterns = [
    # ========================================================================
    # login and permission
    path('check-login/', check_login, name='check_login'),
    path('get-user-permission-info/', views.get_user_permission_info, name='get_user_permission_info'),
    path('get-login-info/', LoginInfoListView.as_view(), name='get-login-info'),
    path('submit-login-info/', views.submit_login_info, name='submit-login-info'),
    # ========================================================================
    # IMPORT BULK DATA
    path('import_bulk_data_to_all_INVENTORY_CATEGORIES/', import_bulk_data_to_all_INVENTORY_CATEGORIES, name='import_bulk_data_to_all_INVENTORY_CATEGORIES'),
    path('import_bulk_data_to_all_CLIENT_CATEGORIES/', import_bulk_data_to_all_CLIENT_CATEGORIES, name='import_bulk_data_to_all_CLIENT_CATEGORIES'),
    # ========================================================================
    # INVENTORY MANAGEMENT
    # TB
    path('get_data_TB_CLIENT_CATEGORIES/', get_data_TB_CLIENT_CATEGORIES.as_view(), name='get_data_TB_CLIENT_CATEGORIES'),
    path('new-number-slip-pnk/', MaxSoPhieuView.as_view(), name='new-number-slip-pnk'),
    path('check-so-phieu/', CheckSoPhieuExistView.as_view(), name='check-so-phieu'),
    path('inventory-stock/', InventoryStockListView.as_view(), name='inventory_stock_list'),
    path('check-ma-hang/', CheckMaHangExistView.as_view(), name='check_ma_hang'),
    path('inventory-stock-by-so-phieu/', InventoryStockBySoPhieuView.as_view(), name='inventory_stock_by_so_phieu'),
    path('save-inventory/', InventoryStockReceivedIssuedReturnedView.as_view(), name='save-inventory'),
    path('download-import-template/', download_file_IMPORT_TEMPLATE, name='download_file'),
    path('download-print-template/', download_file_PRINT_TEMPLATE, name='download_file'),
    path('import-data/', import_data, name='import_data'),
    path('submit-inventory-categories/', views.submit_inventory_categories, name='submit-inventory-categories'),
    
    # ========================================================================
    # CLIENT MANAGEMENT
    # TB
    path('create-client-category/', TBClientCategoriesCreateView.as_view(), name='create-client-category'),
    path('get-next-ma-khach-hang/', GetNextMaKhachHangView.as_view(), name='get-next-ma-khach-hang'),
    path('export-tb-client-categories/', ExportTBClientCategoriesToExcel.as_view(), name='export-tb-client-categories'),
    path('update-xoa-sua/', UpdateXoaSuaView.as_view(), name='update-xoa-sua'),
    # ========================================================================
    # TEST
    path('submit-form/', FormSubmissionView.as_view(), name='submit-form'),
    path('get-inventory-categories/', TBInventoryCategoriesView.as_view(), name='get-inventory-categories'),
    path('get-json-data/', get_json_data, name='get-json-data'),
    # path('get-json-data/<str:file_path>/', get_json_data, name='get-json-data'),
]

urlpatterns += router.urls

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files
