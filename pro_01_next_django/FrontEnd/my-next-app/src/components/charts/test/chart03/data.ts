import { ChartData } from './types';

export const chartData: ChartData[] = [
  { label: 'Sản xuất', value: 25, icon: 'fa-industry' },
  { label: 'Sản phẩm tiêu dùng', value: 15, icon: 'fa-shopping-cart' },
  { label: 'Dịch vụ tài chính', value: 10, icon: 'fa-money-bill' },
  { label: 'Viễn thông', value: 10, icon: 'fa-mobile' },
  { label: 'Giáo dục', value: 10, icon: 'fa-graduation-cap' },
  { label: 'Nông nghiệp', value: 7, icon: 'fa-tractor' },
  { label: 'Các ngành khác', value: 35, icon: 'fa-ellipsis-h' },
  { label: 'Tổng tác động', value: 120, icon: 'fa-chart-line' },
];

// Calculate cumulative data for staircase effect
const cumulativeData = chartData.map((item, index) => {
  const previousValue = index === 0 ? 0 : chartData.slice(0, index).reduce((sum, prev) => sum + prev.value, 0);
  return { ...item, cumulativeValue: previousValue + item.value };
});

export { cumulativeData };