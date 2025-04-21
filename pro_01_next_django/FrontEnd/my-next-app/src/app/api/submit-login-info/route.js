import axios from 'axios';

export async function POST(request) {
  try {
    // Lấy dữ liệu từ form
    const data = await request.json();

    // Gửi dữ liệu từ form tới backend Django
    const response = await axios.post('http://localhost:8000/api/submit-login-info/', data, {
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
