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
    title: 'Mục đích tài khoản',
    content: 'Tài khoản 141 phản ánh các khoản tạm ứng (tiền hoặc vật tư) cho người lao động trong doanh nghiệp và tình hình thanh toán các khoản này.',
  },
  {
    id: 2,
    title: 'Đối tượng và trách nhiệm',
    content: 'Chỉ người lao động trong doanh nghiệp được nhận tạm ứng. Người nhận chịu trách nhiệm sử dụng đúng mục đích, không chuyển nhượng. Số dư không sử dụng phải nộp lại hoặc trừ vào lương.',
  },
  {
    id: 3,
    title: 'Thanh toán và hạch toán',
    content: 'Người nhận lập bảng thanh toán tạm ứng kèm chứng từ gốc. Phải thanh toán dứt điểm khoản trước mới nhận khoản sau. Hạch toán chi tiết theo từng người và từng lần tạm ứng.',
  },
];

// Dữ liệu kết cấu tài khoản
const accountStructure: AccountStructure[] = [
  {
    id: 1,
    section: 'Bên Nợ',
    details: ['Các khoản tiền hoặc vật tư tạm ứng cho người lao động.'],
  },
  {
    id: 2,
    section: 'Bên Có',
    details: [
      'Số tạm ứng đã thanh toán.',
      'Số tiền/vật tư không sử dụng nhập lại quỹ/kho hoặc trừ vào lương.',
    ],
  },
  {
    id: 3,
    section: 'Số dư bên Nợ',
    details: ['Số tạm ứng chưa thanh toán.'],
  },
];

// Dữ liệu phương pháp kế toán
const accountingMethods: AccountingMethod[] = [
  {
    id: 1,
    description: 'Tạm ứng tiền hoặc vật tư cho người lao động',
    entries: [
      'Nợ TK 141 - Tạm ứng',
      'Có TK 111, 112, 152,...',
    ],
  },
  {
    id: 2,
    description: 'Thanh toán khoản tạm ứng sau khi hoàn thành công việc',
    entries: [
      'Nợ TK 152, 153, 156, 241, 331, 621, 623, 627, 642,...',
      'Có TK 141 - Tạm ứng',
    ],
  },
  {
    id: 3,
    description: 'Hoàn nhập số tạm ứng không sử dụng',
    entries: [
      'Nợ TK 111 - Tiền mặt',
      'Nợ TK 152 - Nguyên liệu, vật liệu',
      'Nợ TK 334 - Phải trả người lao động',
      'Có TK 141 - Tạm ứng',
    ],
  },
  {
    id: 4,
    description: 'Thanh toán bổ sung khi chi vượt số tạm ứng',
    entries: [
      'Nợ TK 152, 153, 156, 241, 621, 622, 627,...',
      'Có TK 111 - Tiền mặt',
    ],
  },
];

// Thành phần React hiển thị thông tin tài khoản 141
const AdvancesAccount: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tài khoản 141 - Tạm ứng</h1>

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

export default AdvancesAccount;