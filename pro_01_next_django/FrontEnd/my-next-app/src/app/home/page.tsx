'use client'; // Đảm bảo đây là một component client-side

import Header from '@/components/header/header_Home';
import Footer from '@/components/footer/Footer';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { login } from "@/features/userSlice";

export default function Home() {
  // const dispatch = useAppDispatch();
  // const userId = useAppSelector((state) => state.user.userId);

  // useEffect(() => {
  //   // Khi app khởi động, lấy userId từ localStorage và cập nhật vào Redux nếu có
  //   const storedUserId = localStorage.getItem('user_id');
  //   if (storedUserId && !userId) {
  //     dispatch(login({ userId: storedUserId }));
  //   }
  // }, [dispatch, userId]);

  // useEffect(() => {
  //   console.log("userId in Redux after render:", userId);
  // }, [userId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        
      </main>
      <Footer />
    </div>
  );
}
