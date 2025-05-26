import React from 'react';

// Định nghĩa interface cho nguyên tắc kế toán
interface AccountingPrinciple {
  id: number;
  title: string;
  content: string;
}

// Định nghĩa interface cho kết cấu tài khoản
interface AccountStructure {
  id: number;
  section: string;
  details: string[];
}

// Định nghĩa interface cho phương pháp kế toán
interface AccountingMethod {
  id: number;
  description: string;
  entries: string[];
}

// Dữ liệu nguyên tắc kế toán
const principles: AccountingPrinciple[] = [
  {
    id: 1,
    title: 'Phản ánh và căn cứ hạch toán',
    content: 'Tài khoản 112 phản ánh số dư và biến động tiền gửi không kỳ hạn tại ngân hàng (VND, ngoại tệ, vàng tiền tệ). Căn cứ hạch toán là giấy báo Có/Nợ, bản sao kê ngân hàng và chứng từ gốc.',
  },
  {
    id: 2,
    title: 'Kiểm tra và đối chiếu',
    content: 'Kiểm tra số liệu với ngân hàng, xử lý chênh lệch bằng TK 1388 (Phải thu khác) hoặc TK 3388 (Phải trả khác) nếu chưa xác định nguyên nhân.',
  },
  {
    id: 3,
    title: 'Hạch toán chi tiết',
    content: 'Hạch toán chi tiết theo loại tiền (VND, ngoại tệ) và tài khoản ngân hàng. Thấu chi ngân hàng ghi như khoản vay, không ghi âm trên TK 112.',
  },
  {
    id: 4,
    title: 'Giao dịch ngoại tệ',
    content: 'Bên Nợ TK 1122 áp dụng tỷ giá thực tế, bên Có dùng tỷ giá bình quân gia quyền. Đánh giá lại số dư ngoại tệ theo tỷ giá mua của ngân hàng tại thời điểm báo cáo.',
  },
  {
    id: 5,
    title: 'Vàng tiền tệ',
    content: 'Đánh giá lại vàng tiền tệ theo giá mua thị trường trong nước (Ngân hàng Nhà nước hoặc đơn vị kinh doanh vàng).',
  },
];

// Dữ liệu kết cấu tài khoản
const accountStructure: AccountStructure[] = [
  {
    id: 1,
    section: 'Bên Nợ',
    details: [
      'Tiền gửi vào ngân hàng (VND, ngoại tệ, vàng tiền tệ).',
      'Chênh lệch tỷ giá hối đoái hoặc vàng tiền tệ tăng tại thời điểm báo cáo.',
    ],
  },
  {
    id: 2,
    section: 'Bên Có',
    details: [
      'Tiền rút ra từ ngân hàng.',
      'Chênh lệch tỷ giá hối đoái hoặc vàng tiền tệ giảm tại thời điểm báo cáo.',
    ],
  },
  {
    id: 3,
    section: 'Số dư bên Nợ',
    details: ['Số tiền hiện có tại ngân hàng (VND, ngoại tệ, vàng tiền tệ).'],
  },
  {
    id: 4,
    section: 'Tài khoản cấp 2',
    details: [
      '1121: Tiền Việt Nam.',
      '1122: Ngoại tệ (quy đổi ra VND).',
      '1123: Vàng tiền tệ.',
    ],
  },
];

// Dữ liệu phương pháp kế toán
const accountingMethods: AccountingMethod[] = [
  {
    id: 1,
    description: 'Ghi nhận doanh thu bán hàng/dịch vụ thu bằng tiền gửi ngân hàng',
    entries: [
      'Nợ TK 112 - Tiền gửi ngân hàng (tổng giá thanh toán)',
      'Có TK 511 - Doanh thu bán hàng và cung cấp dịch vụ (giá chưa thuế)',
      'Có TK 333 - Thuế và các khoản phải nộp Nhà nước.',
    ],
  },
  {
    id: 2,
    description: 'Nhận trợ cấp, trợ giá từ Ngân sách Nhà nước',
    entries: [
      'Nợ TK 112 - Tiền gửi ngân hàng',
      'Có TK 333 - Thuế và các khoản phải nộp Nhà nước (3339).',
    ],
  },
  {
    id: 3,
    description: 'Gửi tiền mặt vào ngân hàng',
    entries: [
      'Nợ TK 112 - Tiền gửi ngân hàng',
      'Có TK 111 - Tiền mặt.',
    ],
  },
  {
    id: 4,
    description: 'Thanh toán nợ hoặc mua hàng bằng tiền gửi ngân hàng',
    entries: [
      'Nợ TK 151, 152, 153, 156, 211,... (giá chưa thuế)',
      'Nợ TK 133 - Thuế GTGT được khấu trừ',
      'Có TK 112 - Tiền gửi ngân hàng.',
    ],
  },
  {
    id: 5,
    description: 'Đánh giá lại vàng tiền tệ (lãi)',
    entries: [
      'Nợ TK 1123 - Vàng tiền tệ (theo giá mua trong nước)',
      'Có TK 515 - Doanh thu hoạt động tài chính.',
    ],
  },
  {
    id: 6,
    description: 'Đánh giá lại vàng tiền tệ (lỗ)',
    entries: [
      'Nợ TK 635 - Chi phí tài chính',
      'Có TK 1123 - Vàng tiền tệ (theo giá mua trong nước).',
    ],
  },
];

// Thành phần React hiển thị thông tin tài khoản 112
const BankDepositAccount: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tài khoản 112 - Tiền gửi ngân hàng</h1>

      <h2>1. Nguyên tắc kế toán</h2>
      <ul>
        {principles.map((principle) => (
          <li key={principle.id}>
            <h3>{principle.title}</h3>
            <p>{principle.content}</p>
          </li>
        ))}
      </ul>

      <h2>2. Kết cấu tài khoản</h2>
      <ul>
        {accountStructure.map((structure) => (
          <li key={structure.id}>
            <h3>{structure.section}</h3>
            <ul>
              {structure.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>3. Phương pháp kế toán</h2>
      <ul>
        {accountingMethods.map((method) => (
          <li key={method.id}>
            <h3>{method.description}</h3>
            <ul>
              {method.entries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankDepositAccount;