// src/api/api.ts
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
                            (isLocalhost ? 'http://127.0.0.1:8000' : 'http://172.16.0.4:8000');
// =======================================================================================================
// login and permission
export const API_check_login = `${API_BASE_URL}/api/check-login/`;
export const API_get_user_permission_info = `${API_BASE_URL}/api/get-user-permission-info/`;
export const API_get_login_info = `${API_BASE_URL}/api/get-login-info/`;
export const API_submit_login_info = `${API_BASE_URL}/api/submit-login-info/`;
export const API_user_permissions = `${API_BASE_URL}/api/user-permissions/`;
// =======================================================================================================
// IMPORT BULK DATA
export const API_import_bulk_data_to_all_INVENTORY_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_to_all_INVENTORY_CATEGORIES/`;
export const API_import_bulk_data_to_all_CLIENT_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_to_all_CLIENT_CATEGORIES/`;
export const API_import_bulk_data_to_all_SUPPLIER_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_to_all_SUPPLIER_CATEGORIES/`;
// =======================================================================================================
// INVENTORY MANAGEMENT
export const API_inventory_stock = `${API_BASE_URL}/api/inventory-stock/`;
export const API_import_data = `${API_BASE_URL}/api/import-data/`;
export const API_check_ma_hang = `${API_BASE_URL}/api/check-ma-hang/`;
export const API_inventory_stock_by_so_phieu = `${API_BASE_URL}/api/inventory-stock-by-so-phieu/`;
export const API_submit_inventory_categories = `${API_BASE_URL}/api/submit-inventory-categories/`;
export const API_check_so_phieu = `${API_BASE_URL}/api/check-so-phieu/`;
export const API_save_inventory = `${API_BASE_URL}/api/save-inventory/`;
export const API_download_import_template = `${API_BASE_URL}/api/download-import-template/`;
export const API_download_print_template = `${API_BASE_URL}/api/download-print-template/`;
export const API_new_number_slip_pnk = `${API_BASE_URL}/api/new-number-slip-pnk/`;
export const API_new_number_slip_pxk = `${API_BASE_URL}/api/new-number-slip-pxk/`;
export const API_search_inventory_categories = `${API_BASE_URL}/api/search-inventory-categories/`;
export const API_get_inventory_categories = `${API_BASE_URL}/api/get-inventory-categories/`;
// =======================================================================================================
// CLIENT MANAGEMENT
export const API_create_client_category = `${API_BASE_URL}/api/create-client-category/`;
export const API_get_next_ma_khach_hang = `${API_BASE_URL}/api/get-next-ma-khach-hang/`;
export const API_export_tb_client_categories = `${API_BASE_URL}/api/export-tb-client-categories/`;
export const API_update_xoa_sua_client_categories = `${API_BASE_URL}/api/update-xoa-sua-client-categories/`;
export const API_get_data_ALL_CLIENT_CATEGORIES = `${API_BASE_URL}/api/get_data_ALL_CLIENT_CATEGORIES/`;
export const API_search_client_categories = `${API_BASE_URL}/api/search-client-categories/`;
// =======================================================================================================
// SUPPLIER MANAGEMENT
export const API_create_supplier_category = `${API_BASE_URL}/api/create-supplier-category/`;
export const API_get_next_ma_nha_cung_cap = `${API_BASE_URL}/api/get-next-ma-nha-cung-cap/`;
export const API_export_tb_supplier_categories = `${API_BASE_URL}/api/export-tb-supplier-categories/`;
export const API_update_xoa_sua_supplier_categories = `${API_BASE_URL}/api/update-xoa-sua-supplier-categories/`;
export const API_get_data_ALL_SUPPLIER_CATEGORIES = `${API_BASE_URL}/api/get_data_ALL_SUPPLIER_CATEGORIES/`;
export const API_search_supplier_categories = `${API_BASE_URL}/api/search-supplier-categories/`;
// ========================================================================
// TEST

export const API_get_json_data = `${API_BASE_URL}/api/get-json-data/`;

