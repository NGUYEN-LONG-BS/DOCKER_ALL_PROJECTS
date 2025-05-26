import React from 'react';

// Định nghĩa interface cho nguyên lý kế toán
interface AccountingPrinciple {
  id: number;
  name: string;
  description: string;
}

// Danh sách các nguyên lý kế toán
const accountingPrinciples: AccountingPrinciple[] = [
  {
    id: 1,
    name: 'Nguyên lý nhất quán (Consistency)',
    description: 'Các phương pháp kế toán phải được áp dụng nhất quán qua các kỳ kế toán để đảm bảo tính so sánh của báo cáo tài chính.',
  },
  {
    id: 2,
    name: 'Nguyên lý thận trọng (Conservatism)',
    description: 'Ghi nhận chi phí và nợ phải trả ngay khi có khả năng xảy ra, nhưng chỉ ghi nhận doanh thu và tài sản khi chắc chắn.',
  },
  {
    id: 3,
    name: 'Nguyên lý giá gốc (Historical Cost)',
    description: 'Tài sản và nợ phải trả được ghi nhận theo giá trị tại thời điểm giao dịch ban đầu, trừ một số trường hợp theo IFRS cho phép định giá lại.',
  },
  {
    id: 4,
    name: 'Nguyên lý doanh thu (Revenue Recognition)',
    description: 'Doanh thu được ghi nhận khi hàng hóa hoặc dịch vụ đã được chuyển giao và có khả năng thu được lợi ích kinh tế.',
  },
  {
    id: 5,
    name: 'Nguyên lý phù hợp (Matching)',
    description: 'Chi phí phải được ghi nhận trong cùng kỳ với doanh thu mà nó giúp tạo ra.',
  },
  {
    id: 6,
    name: 'Nguyên lý công khai (Full Disclosure)',
    description: 'Tất cả thông tin quan trọng liên quan đến tình hình tài chính phải được công khai trong báo cáo tài chính.',
  },
  {
    id: 7,
    name: 'Nguyên lý hoạt động liên tục (Going Concern)',
    description: 'Giả định rằng doanh nghiệp sẽ tiếp tục hoạt động trong tương lai gần mà không cần thanh lý tài sản hoặc ngừng hoạt động.',
  },
  {
    id: 8,
    name: 'Nguyên lý cơ sở dồn tích (Accrual Basis)',
    description: 'Doanh thu và chi phí được ghi nhận khi phát sinh, không phụ thuộc vào thời điểm thu hoặc chi tiền.',
  },
  {
    id: 9,
    name: 'Nguyên lý độc lập (Entity)',
    description: 'Hoạt động kinh tế của doanh nghiệp được tách biệt khỏi các hoạt động của chủ sở hữu hoặc các tổ chức khác.',
  },
];

// Thành phần React để hiển thị danh sách nguyên lý kế toán
const AccountingPrinciples: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Nguyên lý kế toán áp dụng trên toàn thế giới</h1>
      <ul>
        {accountingPrinciples.map((principle) => (
          <li key={principle.id}>
            <h3>{principle.name}</h3>
            <p>{principle.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountingPrinciples;