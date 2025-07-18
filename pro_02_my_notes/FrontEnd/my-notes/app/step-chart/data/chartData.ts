export interface ChartDataItem {
  id: string
  label: string
  value: string
  color: string
  icon: string
}

// Dữ liệu
export const chartData: ChartDataItem[] = [
  {
    id: "production",
    label: "Sản xuất",
    value: "25-30",
    color: "#8B4513",
    icon: "🏭",
  },
  {
    id: "consumer-goods",
    label: "Hàng tiêu dùng",
    value: "15-20",
    color: "#A0522D",
    icon: "🛒",
  },
  {
    id: "financial-services",
    label: "Dịch vụ tài chính",
    value: "10-15",
    color: "#CD853F",
    icon: "💰",
  },
  {
    id: "telecommunications",
    label: "Viễn thông",
    value: "10-14",
    color: "#D2691E",
    icon: "📡",
  },
  {
    id: "education",
    label: "Giáo dục",
    value: "10-15",
    color: "#FF8C00",
    icon: "📚",
  },
  {
    id: "environment-agriculture",
    label: "Môi trường & Nông nghiệp",
    value: "7-10",
    color: "#FF6347",
    icon: "🌱",
  },
  {
    id: "other-sectors",
    label: "Các ngành khác",
    value: "35-40",
    color: "#C0C0C0",
    icon: "⚪",
  },
  {
    id: "total-impact",
    label: "Tổng tác động",
    value: "134-144",
    color: "#808080",
    icon: "📊",
  },
]