from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

from .views import LoginInfoListView
from .views_INVENTORY_CATEGORIES import TBInventoryCategoriesView
from .views import get_json_data
from .views import check_login

from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import InventoryStockReceivedIssuedReturnedView
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import download_file_IMPORT_TEMPLATE
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import download_file_PRINT_TEMPLATE
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import import_data
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import MaxSoPhieuView
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import CheckSoPhieuExistView
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import InventoryStockListView
from .views_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED import InventoryStockBySoPhieuView

from .views_INVENTORY_CATEGORIES import import_bulk_data_to_all_INVENTORY_CATEGORIES
from .views_INVENTORY_CATEGORIES import search_inventory_categories
from .views_INVENTORY_CATEGORIES import submit_inventory_categories
from .views_INVENTORY_CATEGORIES import CheckMaHangExistView

from .views_CLIENT_CATEGORIES import import_bulk_data_to_all_CLIENT_CATEGORIES
from .views_CLIENT_CATEGORIES import Client_Categories_Create_View
from .views_CLIENT_CATEGORIES import GetNextMaKhachHangView
from .views_CLIENT_CATEGORIES import ExportTBClientCategoriesToExcel
from .views_CLIENT_CATEGORIES import UpdateXoaSuaClientView
from .views_CLIENT_CATEGORIES import search_client_categories
from .views_CLIENT_CATEGORIES import get_data_ALL_CLIENT_CATEGORIES
# ===========================================================================
from .views_SUPPLIER_CATEGORIES import import_bulk_data_to_all_SUPPLIER_CATEGORIES
from .views_SUPPLIER_CATEGORIES import TBSupplierCategoriesCreateView
from .views_SUPPLIER_CATEGORIES import get_next_ma_nha_cung_cap
from .views_SUPPLIER_CATEGORIES import ExportTBSupplierCategoriesToExcel
from .views_SUPPLIER_CATEGORIES import UpdateXoaSuaSupplierView
from .views_SUPPLIER_CATEGORIES import search_supplier_categories
from .views_SUPPLIER_CATEGORIES import get_data_TB_SUPPLIER_CATEGORIES
# ===========================================================================
from rest_framework.routers import DefaultRouter
from .views import UserPermissionViewSet

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
    path('import_bulk_data_to_all_SUPPLIER_CATEGORIES/', import_bulk_data_to_all_SUPPLIER_CATEGORIES, name='import_bulk_data_to_all_SUPPLIER_CATEGORIES'),
    # ========================================================================
    # INVENTORY MANAGEMENT
    path('search-inventory-categories/', search_inventory_categories),
    path('new-number-slip-pnk/', MaxSoPhieuView.as_view(), name='new-number-slip-pnk'),
    path('check-so-phieu/', CheckSoPhieuExistView.as_view(), name='check-so-phieu'),
    path('inventory-stock/', InventoryStockListView.as_view(), name='inventory_stock_list'),
    path('check-ma-hang/', CheckMaHangExistView.as_view(), name='check_ma_hang'),
    path('inventory-stock-by-so-phieu/', InventoryStockBySoPhieuView.as_view(), name='inventory_stock_by_so_phieu'),
    path('save-inventory/', InventoryStockReceivedIssuedReturnedView.as_view(), name='save-inventory'),
    path('download-import-template/', download_file_IMPORT_TEMPLATE, name='download_file'),
    path('download-print-template/', download_file_PRINT_TEMPLATE, name='download_file'),
    path('import-data/', import_data, name='import_data'),
    path('submit-inventory-categories/', submit_inventory_categories, name='submit-inventory-categories'),
    path('get-inventory-categories/', TBInventoryCategoriesView.as_view(), name='get-inventory-categories'),
    # ========================================================================
    # CLIENT MANAGEMENT
    path('create-client-category/', Client_Categories_Create_View.as_view(), name='create-client-category'),
    path('get-next-ma-khach-hang/', GetNextMaKhachHangView.as_view(), name='get-next-ma-khach-hang'),
    path('export-tb-client-categories/', ExportTBClientCategoriesToExcel.as_view(), name='export-tb-client-categories'),
    path('update-xoa-sua-client-categories/', UpdateXoaSuaClientView.as_view(), name='update-xoa-sua-client-categories'),
    path('search-client-categories/', search_client_categories),
    path('get_data_ALL_CLIENT_CATEGORIES/', get_data_ALL_CLIENT_CATEGORIES.as_view(), name='get_data_ALL_CLIENT_CATEGORIES'),
    # ========================================================================
    # SUPPLIER MANAGEMENT
    path('create-supplier-category/', TBSupplierCategoriesCreateView.as_view(), name='create-supplier-category'),
    path('get-next-ma-nha-cung-cap/', get_next_ma_nha_cung_cap, name='get-next-ma-nha-cung-cap'),
    path('export-tb-supplier-categories/', ExportTBSupplierCategoriesToExcel.as_view(), name='export-tb-supplier-categories'),
    path('update-xoa-sua-supplier-categories/', UpdateXoaSuaSupplierView.as_view(), name='update-xoa-sua-supplier-categories'),
    path('search-supplier-categories/', search_supplier_categories),
    path('get_data_TB_SUPPLIER_CATEGORIES/', get_data_TB_SUPPLIER_CATEGORIES.as_view(), name='get_data_TB_SUPPLIER_CATEGORIES'),
    # ========================================================================
    # TEST
    
    path('get-json-data/', get_json_data, name='get-json-data'),
]

urlpatterns += router.urls

if settings.DEBUG:  # Only serve static and media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files
