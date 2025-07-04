export interface MenuItem {
  label: string;
  href?: string;
  permission?: string | string[];
  submenu?: MenuItem[];
  submenu_02?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  // ================================================================================
  // ========================= TRADING SUBSIDIARIES =================================
  // ================================================================================
  {
    label: 'Kinh Doanh TM',
    href: '#',
    permission: ['Admin', 'KinhDoanhTM'],
    submenu: [
      {
        label: 'Quản lý khách hàng',
        permission: ['Admin', 'KinhDoanhTM'],
        submenu_02: [
          { label: 'Danh sách khách hàng', href: '/client-management' },
        ],
      },
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'KinhDoanhTM'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
          { label: 'tạo mới mã hàng', href: '#' },
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
        permission: ['Admin', 'VatTuTM'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management' },
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
        ],
      },
      {
        label: 'Danh sách nhà cung cấp',
        permission: ['Admin', 'VatTuTM'],
        submenu_02: [
          { label: 'Danh sách nhà cung cấp', href: '/supplier-management' },
          
        ],
      },
    ],
  },
  {
    label: 'Tài Chính - Kế Toán TM',
    href: '#',
    permission: ['Admin', 'TaiChinhTM', 'KeToanTM'],
    submenu: [
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'TaiChinhTM', 'KeToanTM'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
          
        ],
      },
    ],
  },
  {
    label: 'Kiểm soát nội bộ TM',
    href: '#',
    permission: ['Admin', 'KiemSoatTM'],
    submenu: [
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'KiemSoatTM'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
          
        ],
      },
    ],
  },
  // ================================================================================
  // ========================= FACTORY SUBSIDIARIES =================================
  // ================================================================================
  {
    label: 'Kinh Doanh SX',
    permission: ['Admin', 'KinhDoanhSX'],
    submenu: [
      {
        label: 'Quản lý khách hàng',
        permission: ['Admin', 'KinhDoanhSX'],
        submenu_02: [
          { label: 'Danh sách khách hàng', href: '/client-management' },
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
        ],
      },
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'KinhDoanhSX'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
          { label: 'tạo mới mã hàng', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Vật Tư SX',
    permission: ['Admin', 'VatTuSX'],
    submenu: [
      {
        label: 'Danh sách nhà cung cấp',
        permission: ['Admin', 'VatTuSX'],
        submenu_02: [
          { label: 'Danh sách nhà cung cấp', href: '/supplier-management' },
        ],
      },
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'VatTuSX'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
        ],
      },
    ],
  },
  {
    label: 'Kế Hoạch SX',
    permission: ['Admin', 'KeHoachSX'],
    submenu: [
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'KeHoachSX'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
        ],
      },
    ],
  },
  {
    label: 'Tài Chính - Kế Toán SX',
    permission: ['Admin', 'TaiChinhSX', 'KeToanSX'],
    submenu: [
      {
        label: 'Kế toán kho',
        permission: ['Admin', 'TaiChinhSX', 'KeToanSX'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management' },
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
        ],
      },
    ],
  },
  { label: 'Nhân Sự SX', href: '/bpnhansu', permission: ['Admin', 'NhanSuSX'] },
  {
    label: 'Kiểm soát nội bộ SX',
    href: '#',
    permission: ['Admin', 'KiemSoatSX'],
    submenu: [
      {
        label: 'Quản lý sản phẩm',
        permission: ['Admin', 'KiemSoatSX'],
        submenu_02: [
          { label: 'Báo cáo tồn kho', href: '/dashboard' },
          
        ],
      },
    ],
  },
  // ================================================================================
  // ========================= FACTORY SUBSIDIARIES =================================
  // ================================================================================
  {
    label: 'Admin',
    permission: ['Admin'],
    submenu: [
      {
        label: 'User',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Tạo mới user', href: '/admin/user-login-info' },
          { label: 'Phân quyền user', href: '/admin/user-permission-info' },
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