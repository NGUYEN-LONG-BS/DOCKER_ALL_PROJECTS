// src/utils/checkPermission.ts
import { API_get_user_permission_info } from "@/api/api";
import { useAppDispatch } from "@/store/store";
import { login, logout } from "@/features/userSlice";

export async function checkPermission(allowedPermissions: string[], router: any, dispatch?: any): Promise<boolean> {
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  if (!userId) {
    router.replace("/login");
    return false;
  }

  try {
    const response = await fetch(`${API_get_user_permission_info}?user_id=${userId}`);
    const data = await response.json();

    if (!Array.isArray(data) || !data.some((item) => allowedPermissions.includes(item.department))) {
      localStorage.removeItem("user_id");
      document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (dispatch) dispatch(logout());
      router.replace("/login");
      return false;
    }
    // Lưu thông tin department và subsidiary đầu tiên vào Redux
    if (dispatch && data.length > 0) {
      dispatch(login({
        userId,
        department: data[0].department || null,
        subsidiary: data[0].subsidiary || null,
      }));
    }
    return true;
  } catch {
    localStorage.removeItem("user_id");
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (dispatch) dispatch(logout());
    router.replace("/login");
    return false;
  }
}