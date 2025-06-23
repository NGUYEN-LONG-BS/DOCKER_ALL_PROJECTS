import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { login } from "@/features/userSlice";
import { API_get_user_permission_info } from "@/api/api";

export function useSyncUserIdFromLocalStorage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId && !userId) {
        // Lấy luôn department và subsidiary từ API
        fetch(`${API_get_user_permission_info}?user_id=${storedUserId}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(
              login({
                userId: storedUserId,
                department: data && data[0] ? data[0].department : null,
                subsidiary: data && data[0] ? data[0].subsidiary : null,
              })
            );
          })
          .catch(() => {
            dispatch(login({ userId: storedUserId }));
          });
      }
    }
  }, [dispatch, userId]);
}
