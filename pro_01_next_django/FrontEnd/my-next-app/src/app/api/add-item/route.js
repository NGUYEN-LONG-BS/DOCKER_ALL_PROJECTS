import { NextResponse } from 'next/server';

// Giả sử bạn lưu mã hàng vào một mảng (trong trường hợp này, không sử dụng cơ sở dữ liệu thực tế)
let items = [];

export async function POST(request) {
  try {
    const { code, name, description } = await request.json();
    
    // Thêm mã hàng mới vào danh sách (hoặc cơ sở dữ liệu)
    const newItem = { code, name, description };
    items.push(newItem);

    // Trả về dữ liệu mã hàng vừa được thêm
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Đã có lỗi xảy ra' }, { status: 500 });
  }
}
