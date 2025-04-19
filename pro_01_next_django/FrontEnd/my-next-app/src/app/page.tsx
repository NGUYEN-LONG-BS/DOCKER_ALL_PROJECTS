'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home'); // Điều hướng đến /home ngay khi trang được tải
  }, [router]);

  return null; // Không cần render gì cả, chỉ cần chuyển hướng
}
