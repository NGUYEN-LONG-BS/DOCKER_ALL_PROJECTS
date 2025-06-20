export interface MenuItem {
  label: string;
  href?: string;
  permission?: string | string[];
  submenu?: MenuItem[];
  submenu_02?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  // { label: 'Kinh Doanh TM', href: '#', permission: ['Admin', 'KinhDoanhTM'] },
  {
    label: 'Kinh Doanh TM',
    href: '#',
    permission: ['Admin', 'KinhDoanhTM'],
    submenu: [
      {
        label: 'Danh sách khách hàng',
        permission: ['Admin', 'KinhDoanhTM'],
        submenu_02: [
          { label: 'Danh sách khác hàng', href: '/client-management' },
          
        ],
      },
    ],
  },
  {
    label: 'Vật Tư TM',
    permission: ['Admin', 'VatTuTM'],
    submenu: [
      {
        label: 'Kế toán kho',
        permission: ['Admin', 'TaiChinhTM', 'KeToanTM'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management' },
          { label: 'Báo cáo kho', href: '/dashboard' },
        ],
      },
    ],
  },
  { label: 'Tài Chính - Kế Toán TM', href: '#', permission: ['Admin', 'TaiChinhTM', 'KeToanTM'] },

  { label: 'Kinh Doanh SX', href: '#', permission: ['Admin', 'KinhDoanhSX'] },
  { label: 'Vật Tư SX', href: '#', permission: ['Admin', 'VatTuSX'] },
  { label: 'Kế Hoạch SX', href: '#', permission: ['Admin', 'KeHoachSX'] },
  {
    label: 'Tài Chính - Kế Toán SX',
    permission: ['Admin', 'TaiChinhSX', 'KeToanSX'],
    submenu: [
      {
        label: 'Kế toán kho',
        permission: ['Admin', 'TaiChinhSX', 'KeToanSX'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management' },
          { label: 'Báo cáo kho', href: '/dashboard' },
        ],
      },
    ],
  },
  { label: 'Nhân Sự SX', href: '/bpnhansu', permission: ['Admin', 'NhanSuSX'] },
  {
    label: 'Admin',
    permission: ['Admin'],
    submenu: [
      {
        label: 'User',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Tạo mới user', href: '/admin/user' },
          { label: 'Phân quyền user', href: '/admin/user' },
        ],
      },
      {
        label: 'Client',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Tạo mới Client', href: '/client-management' },
        ],
      },
      {
        label: 'import bulk data',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Import bulk Data', href: '/admin/import-bulk-data' },
        ],
      },
      {
        label: 'Test link',
        permission: ['Admin'],
        submenu_02: [
          { label: 'test inventory V0', href: '/inventory-management' },
          { label: 'test inventory with reDux', href: '/inventory-management' },
          { label: 'test trang thêm mã hàng', href: '/bpvattu/inventory' },
        ],
      },
      {
        label: 'Report',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Báo cáo', href: '/my-reports' },
          { label: 'dashboard', href: '/dashboard' },
          { label: 'report-warehouse', href: '/report-warehouse' },
          { label: 'my-report-bao-cao-tong-quan', href: '/my-report-bao-cao-tong-quan' },
        ],
      },
    ],
  },
];