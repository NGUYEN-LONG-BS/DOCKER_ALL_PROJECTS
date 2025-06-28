import { API_get_user_permission_info } from "@/api/api";

// Hàm lấy subsidiary đầu tiên từ API quyền user dựa vào userId
export async function getPermissionOnDB(userId: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_get_user_permission_info}?user_id=${userId}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0 && data[0].subsidiary) {
      return data[0].subsidiary;
    }
    return null;
  } catch {
    return null;
  }
}
