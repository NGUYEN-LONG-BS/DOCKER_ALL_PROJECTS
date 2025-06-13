// src/api/api.ts
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
export const API_new_number_slip_pnk = `${API_BASE_URL}/api/new-number-slip-pnk/`;
export const API_CHECK_SO_PHIEU_ENDPOINT = `${API_BASE_URL}/api/check-so-phieu/`;
// Invenory reveived log
export const API_INVENTORY_RECEIVED_LOG = `${API_BASE_URL}/api/inventory-stock/`;
// Invenory category
export const API_CHECK_INVENTORY_CODE_EXIST = `${API_BASE_URL}/api/check-ma-hang/`;
export const API_GET_INVENTORY_CATEGORIES = `${API_BASE_URL}/api/get-inventory-categories/`;
// Login
export const API_CHECK_LOGIN = `${API_BASE_URL}/api/check-login/`;
export const API_SUBMIT_FORM = `${API_BASE_URL}/api/submit-form/`;
export const API_SUBMIT_LOGIN_INFO = `${API_BASE_URL}/api/submit-login-info/`;
