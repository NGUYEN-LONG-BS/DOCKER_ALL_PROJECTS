// src/api/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
export const API_new_number_slip_pnk = `${API_BASE_URL}/api/new-number-slip-pnk/`;
export const API_check_so_phieu = `${API_BASE_URL}/api/check-so-phieu/`;
// Invenory reveived log
export const API_inventory_stock = `${API_BASE_URL}/api/inventory-stock/`;
export const API_import_data = `${API_BASE_URL}/api/import-data/`;
// Invenory category
export const API_check_ma_hang = `${API_BASE_URL}/api/check-ma-hang/`;
export const API_get_inventory_categories = `${API_BASE_URL}/api/get-inventory-categories/`;
// Login
export const API_check_login = `${API_BASE_URL}/api/check-login/`;
export const API_submit_form = `${API_BASE_URL}/api/submit-form/`;
export const API_submit_login_info = `${API_BASE_URL}/api/submit-login-info/`;
export const API_get_user_permission_info = `${API_BASE_URL}/api/get-user-permission-info/`;

