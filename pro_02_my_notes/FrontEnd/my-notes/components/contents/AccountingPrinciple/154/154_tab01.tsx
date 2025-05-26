import React from 'react';

// Thành phần chính hiển thị thông tin Tài khoản 154
const Account154: React.FC = () => {
  // Nội dung cho mục Nguyên tắc kế toán
  const principlesContent = [
    'Mục đích: Tài khoản 154 tập hợp chi phí sản xuất, kinh doanh và tính giá thành sản phẩm/dịch vụ (phương pháp kê khai thường xuyên) hoặc phản ánh giá trị sản phẩm/dịch vụ dở dang cuối kỳ (phương pháp kiểm kê định kỳ).',
    'Phản ánh: Chi phí phát sinh trong kỳ, chi phí sản phẩm/dịch vụ hoàn thành, chi phí dở dang đầu/cuối kỳ cho các hoạt động sản xuất, gia công, dịch vụ.',
    'Hạch toán chi tiết: Theo địa điểm (phân xưởng, công trường), loại sản phẩm/dịch vụ, công đoạn.',
    'Chi phí bao gồm: Nguyên liệu/vật liệu trực tiếp, nhân công trực tiếp, sử dụng máy thi công, sản xuất chung.',
    'Không bao gồm: Chi phí vượt mức bình thường, chi phí sản xuất chung cố định không phân bổ (ghi vào TK 632), chi phí bán hàng, quản lý, tài chính, thuế TNDN, sự nghiệp, dự án, đầu tư XDCB.',
    'Phân bổ: Chi phí sản xuất chung cố định phân bổ theo công suất bình thường; chi phí biến đổi phân bổ hết theo thực tế.',
  ];

  // Nội dung cho mục Kết cấu tài khoản
  const accountStructureContent = [
    'Bên Nợ:',
    '  - Chi phí phát sinh (nguyên liệu, nhân công, máy thi công, sản xuất chung).',
    '  - Chi phí dở dang cuối kỳ (phương pháp kiểm kê định kỳ).',
    'Bên Có:',
    '  - Giá thành sản phẩm/dịch vụ hoàn thành (nhập kho, bán, tiêu dùng nội bộ, XDCB).',
    '  - Phế liệu, sản phẩm hỏng, chi phí vượt mức bình thường/không phân bổ (ghi vào TK 632).',
    'Số dư bên Nợ: Chi phí sản xuất, kinh doanh còn dở dang cuối kỳ.',
  ];

  // Nội dung cho mục Phương pháp kế toán
  const accountingMethodsContent = [
    'Công nghiệp: Tập hợp chi phí (nguyên liệu, nhân công, sản xuất chung) theo phân xưởng, sản phẩm; tính giá thành sản phẩm, bao gồm cả gia công thuê ngoài.',
    'Nông nghiệp: Hạch toán chi tiết theo ngành (trồng trọt, chăn nuôi), loại cây/con, vụ; giá thành tính cuối vụ/năm; cây lâu năm trong giai đoạn XDCB ghi vào TK 241.',
    'Dịch vụ: Tập hợp chi phí và tính giá thành dịch vụ (vận tải, du lịch, khách sạn); chi tiết theo loại dịch vụ.',
    'Xây dựng: Hạch toán chi phí xây lắp (vật liệu, nhân công, máy thi công, sản xuất chung) theo công trình, hạng mục; bao gồm tài khoản cấp 2 (1541 - Xây lắp, 1542 - Sản phẩm khác, 1543 - Dịch vụ, 1544 - Bảo hành).',
    'Kê khai thường xuyên:',
    '  - Kết chuyển chi phí (TK 621, 622, 627) vào TK 154; chi phí vượt mức bình thường/không phân bổ ghi vào TK 632.',
    '  - Giá thành sản phẩm hoàn thành: Nợ TK 155/632/641/642/241, Có TK 154.',
    '  - Phế liệu, sản phẩm hỏng: Nợ TK 152/138/334, Có TK 154.',
    'Kiểm kê định kỳ: Kết chuyển chi phí dở dang cuối kỳ (Nợ TK 154, Có TK 631) và đầu kỳ (Nợ TK 631, Có TK 154).',
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tài khoản 154 - Chi phí sản xuất, kinh doanh dở dang</h1>

      {/* Nguyên tắc kế toán */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Nguyên tắc kế toán</h2>
        <ul>
          {principlesContent.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Kết cấu tài khoản */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Kết cấu tài khoản</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {accountStructureContent.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Phương pháp kế toán */}
      <div>
        <h2>Phương pháp kế toán</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {accountingMethodsContent.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Account154;