import React from 'react';

const AccountStructureContent: React.FC = () => {
  const content = [
    'Bên Nợ: Các khoản tiền hoặc vật tư tạm ứng cho người lao động.',
    'Bên Có: Số tạm ứng đã thanh toán.',
    'Bên Có: Số tiền/vật tư không sử dụng nhập lại quỹ/kho hoặc trừ vào lương.',
    'Số dư bên Nợ: Số tạm ứng chưa thanh toán.',
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Các điểm cần ghi nhớ</h2>
      <ul>
        {content.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountStructureContent;