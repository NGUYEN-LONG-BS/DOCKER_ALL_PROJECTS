"use client";
import React, { useState } from 'react';

import PrinciplesContent from './154_tab01';
import AccountStructureContent from './154_tab02';
import AccountingMethodsContent from './154_tab03';

// Định nghĩa interface cho tab
interface TabContent {
  id: number;
  title: string;
}

// Dữ liệu cho các tab
const tabs: TabContent[] = [
  { id: 1, title: 'Nguyên tắc kế toán' },
  { id: 2, title: 'Các điểm cần ghi nhớ' },
  { id: 3, title: 'Tài liệu tham khảo' },
];

// Thành phần chính hiển thị các tab
const AdvancesAccountTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '2px solid #ccc', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: activeTab === tab.id ? '#007bff' : '#f8f9fa',
              color: activeTab === tab.id ? '#fff' : '#000',
              cursor: 'pointer',
              marginRight: '5px',
              borderRadius: '5px 5px 0 0',
              transition: 'background-color 0.3s',
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 1 && <PrinciplesContent />}
      {activeTab === 2 && <AccountStructureContent />}
      {activeTab === 3 && <AccountingMethodsContent />}
    </div>
  );
};

export default AdvancesAccountTabs;