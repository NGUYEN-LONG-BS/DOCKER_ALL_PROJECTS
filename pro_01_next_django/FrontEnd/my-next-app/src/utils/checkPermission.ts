// src/utils/checkPermission.ts
import { API_get_user_permission_info } from "@/api/api";

export async function checkPermission(allowedPermissions: string[], router: any): Promise<boolean> {
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
      router.replace("/login");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("user_id");
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login");
    return false;
  }
}