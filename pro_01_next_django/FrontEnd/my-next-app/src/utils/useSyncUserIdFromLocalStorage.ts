import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { login } from "@/features/userSlice";

export function useSyncUserIdFromLocalStorage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId && !userId) {
        dispatch(login({ userId: storedUserId }));
      }
    }
  }, [dispatch, userId]);
}
