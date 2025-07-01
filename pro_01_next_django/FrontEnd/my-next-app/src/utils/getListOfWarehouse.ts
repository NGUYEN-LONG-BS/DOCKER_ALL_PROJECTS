import axios from "axios";
import { getPermissionOnDB } from "@/utils/getPermissionOnDB";
import { API_get_danh_sach_ma_kho } from "@/api/api";

export interface Warehouse {
  ma_kho: string;
  ten_kho: string;
}

/**
 * Lấy danh sách mã kho từ API backend theo userId (tự động lấy model_key/subsidiary từ quyền user)
 * @param userId user_id hiện tại
 * @returns Promise<Warehouse[]>
 */
export async function getListOfWarehouse(userId: string): Promise<Warehouse[]> {
  const model_key = await getPermissionOnDB(userId);
  if (!model_key) return [];
  const url = `${API_get_danh_sach_ma_kho}?model_key=${encodeURIComponent(model_key)}`;
  const response = await axios.get<Warehouse[]>(url);
  return response.data;
}
