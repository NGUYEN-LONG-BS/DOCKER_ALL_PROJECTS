export interface MenuItem {
  label: string;
  href?: string;
  permission?: string | string[];
  submenu?: MenuItem[];
  submenu_02?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: 'Kinh Doanh TM', href: '#', permission: ['Admin', 'KinhDoanhTM'] },
  {
    label: 'Vật Tư TM',
    permission: ['Admin', 'VatTuTM'],
    submenu: [
      {
        label: 'Kế toán kho',
        permission: ['Admin', 'TaiChinhTM', 'KeToanTM'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management-with_reDux_ToolKit' },
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
          { label: 'Xuất nhập tồn', href: '/inventory-management-with_reDux_ToolKit' },
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
        label: 'import bulk data',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Import bulk Data', href: '/admin/import-bulk-data' },
        ],
      },
      {
        label: 'Django',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Docker 01', href: '/html/django/start_dijango_with_docker_step_01.html' },
          { label: 'Docker 02', href: '/html/django/start_dijango_with_docker_step_02.html' },
          { label: 'Docker 03', href: '/html/django/start_dijango_with_docker_step_03.html' },
          { label: 'Docker 04', href: '/html/django/start_dijango_with_docker_step_04.html' },
        ],
      },
      {
        label: 'nextjs',
        permission: ['Admin'],
        submenu_02: [
          { label: 'flow-redux-toolkit', href: '/html/nextjs/flow-redux-toolkit.html' },
          { label: 'next-link-to-html-static', href: '/html/nextjs/next-link-to-html-static.html' },
          { label: 'react-hooks', href: '/html/nextjs/react-hooks.html' },
          { label: 'react-redux', href: '/html/nextjs/react-redux.html' },
          { label: 'redux-toolkit', href: '/html/nextjs/redux-toolkit.html' },
          { label: 'useState-useReducer', href: '/html/nextjs/useState-useReducer.html' },
        ],
      },
      {
        label: 'economic',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Lãi suất Việt Nam', href: '/html/economic/eco-interest_rates_full.html' },
        ],
      },
      {
        label: 'orther-projects',
        permission: ['Admin'],
        submenu_02: [
          { label: 'base', href: '/html/orther-projects/base.html' },
          { label: 'danh_muc_san_pham', href: '/html/orther-projects/danh_muc_san_pham.html' },
          { label: 'home', href: '/html/orther-projects/home.html' },
          { label: 'index', href: '/html/orther-projects/index.html' },
          { label: 'login', href: '/html/orther-projects/login.html' },
          { label: 'mychart', href: '/html/orther-projects/mychart.html' },
          { label: 'ngay_quan_trong', href: '/html/orther-projects/ngay_quan_trong.html' },
          { label: 'postGreSQL-config-remote-connecttion', href: '/html/orther-projects/postGreSQL-config-remote-connecttion.html' },
          { label: 'user', href: '/html/orther-projects/user.html' },
        ],
      },
      {
        label: 'Test link',
        permission: ['Admin'],
        submenu_02: [
          { label: 'test inventory V0', href: '/inventory-management' },
          { label: 'test inventory with reDux', href: '/inventory-management-with_reDux_ToolKit' },
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