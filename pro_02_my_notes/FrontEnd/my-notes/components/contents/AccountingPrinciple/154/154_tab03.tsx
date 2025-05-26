import React from 'react';

const AccountingMethodsContent: React.FC = () => {
  const content = [
    'Tạm ứng tiền hoặc vật tư cho người lao động:',
    '  - Nợ TK 141 - Tạm ứng',
    '  - Có TK 111, 112, 152,...',
    'Thanh toán khoản tạm ứng sau khi hoàn thành công việc:',
    '  - Nợ TK 152, 153, 156, 241, 331, 621, 623, 627, 642,...',
    '  - Có TK 141 - Tạm ứng',
    'Hoàn nhập số tạm ứng không sử dụng:',
    '  - Nợ TK 111 - Tiền mặt',
    '  - Nợ TK 152 - Nguyên liệu, vật liệu',
    '  - Nợ TK 334 - Phải trả người lao động',
    '  - Có TK 141 - Tạm ứng',
    'Thanh toán bổ sung khi chi vượt số tạm ứng:',
    '  - Nợ TK 152, 153, 156, 241, 621, 622, 627,...',
    '  - Có TK 111 - Tiền mặt',
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Phương pháp kế toán</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        {content.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountingMethodsContent;