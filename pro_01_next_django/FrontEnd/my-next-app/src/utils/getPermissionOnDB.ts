import { API_get_user_permission_info } from "@/api/api";

// Hàm lấy subsidiary đầu tiên từ API quyền user dựa vào userId
export async function getPermissionOnDB(userId: string): Promise<string | null> {
  try {
    const url = `${API_get_user_permission_info}?user_id=${userId}`;
    console.log("[getPermissionOnDB] URL fetch:", url); // Log URL thực tế
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0 && data[0].subsidiary) {
      return data[0].subsidiary;
    }
    return null;
  } catch {
    return null;
  }
}
