import axios from 'axios';
import { API_SUBMIT_LOGIN_INFO } from '@/api/api';

export async function POST(request) {
  try {
    // Lấy dữ liệu từ form
    const data = await request.json();

    // Gửi dữ liệu từ form tới backend Django
    const response = await axios.post(API_SUBMIT_LOGIN_INFO, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Đã có lỗi xảy ra, vui lòng thử lại!' }),
      { status: 500 }
    );
  }
}
