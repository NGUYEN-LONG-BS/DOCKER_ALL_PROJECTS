export interface PropertyData {
  id: string
  title: string
  price: string
  area: string
  bedrooms: number
  address: string
  description: string
  features: PropertyFeature[]
  images: string[]
  contact: ContactInfo
  specifications: PropertySpec[]
}

export interface PropertyFeature {
  icon: string
  label: string
  value: string
}

export interface ContactInfo {
  name: string
  phone: string
  avatar: string
  lastSeen: string
}

export interface PropertySpec {
  label: string
  value: string
}

export interface LocationSuggestion {
  district: string
  count: number
}

export const propertyData: PropertyData = {
  id: "43180567",
  title: "Bán nhà riêng Mỹ Đình, dt 56m2, 6 tô đồ cửa, giá 13.8 tỷ. Lh: 0372 541",
  price: "13.8 tỷ",
  area: "56 m²",
  bedrooms: 4,
  address: "Đường Mỹ Đình, Phường Mỹ Đình 1, Nam Từ Liêm, Hà Nội",
  description: `Bán nhà riêng Mỹ Đình, dt 56m2, 6 tô đồ cửa, giá 13.8 tỷ. Lh: 0372 541 ***

- Vip Mỹ Đình - 6 tô đồ cửa - gần phố - gần trường - bến xe - trường học.
- Chủ nhà công tác, có nhà riêng muốn bán.
- 6 tô đồ cửa, gần chợ, trường cấp 1, 2 Mỹ Đình 2km ra mặt phố Mỹ Đình Đối diện UBND và trường THPT Mỹ Đình.
Thiết kế đẹp.

+ Tầng 1: Sân để xe, phòng khách, wc.
+ Tầng 2, 3: Mỗi tầng 2 phòng, wc.
+ Tầng 4: Phòng thường và sân phơi.
Sổ đỏ vướng đẹp, chính chủ giao dịch ngay.

- LH: Mr Long - 0372 541 ***`,
  features: [
    { icon: "💰", label: "Mức giá", value: "13.8 tỷ" },
    { icon: "🏠", label: "Hướng nhà", value: "Đông" },
    { icon: "📐", label: "Diện tích", value: "56 m²" },
    { icon: "🏢", label: "Mặt tiền", value: "4 m" },
    { icon: "🛏️", label: "Số phòng ngủ", value: "4 phòng" },
    { icon: "🚪", label: "Đường vào", value: "3 m" },
    { icon: "🛁", label: "Số phòng tắm, vệ sinh", value: "3 phòng" },
    { icon: "📋", label: "Pháp lý", value: "Sổ đỏ/ Sổ hồng" },
    { icon: "🏢", label: "Số tầng", value: "4 tầng" },
  ],
  images: [
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (1).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (2).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (3).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (4).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (5).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (6).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (7).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (8).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (9).jpg",
    "../../bat-dong-san/SP-HCM-Q5-A0001/SP-HCM-Q5-A0001 (10).jpg",
  ],
  contact: {
    name: "Mr Long Nguyen",
    phone: "0372 541 ***",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Xem thêm 29 tin khác",
  },
  specifications: [
    { label: "~246,43 triệu/m²", value: "" },
    { label: "Mặt tiền 4 m", value: "" },
  ],
}

export const locationSuggestions: LocationSuggestion[] = [
  { district: "Tân mỹ", count: 15 },
  { district: "Đức Hoà", count: 26 },
  { district: "Hiệp Hoà", count: 12 },
  { district: "Đức Hoà Đông", count: 16 },
  { district: "Đức Hoà Hạ", count: 51 },
  { district: "Đức Hoà Thượng", count: 10 },
  { district: "Đức Lập Hạ", count: 10 },
  { district: "Đức Lập Thượng", count: 5 },
  { district: "Mỹ Hạnh Bắc", count: 6 },
  { district: "Mỹ Hạnh Nam", count: 7 },
]

export const relatedProperties = [
  "Bán đất Gia Lai",
  "Chung cư The One Residence",
  "Bán nhà Cầu Diễn",
  "Chung cư FLC Star Tower",
  "Cho thuê nhà mặt phố Lê Đức Thọ",
  "Căn hộ Khuông Việt",
  "Chung cư New Horizon City - 87 Lĩnh Nam",
  "Bán đất nền Biên Hòa Riverside",
  "Tincom Pháp Vân",
  "căn hộ Habitat",
  "Bán nhà mặt phố Lê Đức Thọ",
  "Bán nhà mặt phố Định Thôn",
  "Chung cư thap doanh nhân Tower",
  "Bán nhà mặt phố Nguyễn Cơ Thạch",
  "Bán nhà Quận 10",
  "Chung cư Hateco Xuân Phương",
  "Bán nhà Ba Đình",
  "Bán nhà Bách Khoa",
  "Bán nhà Phường 1 Quận 11",
  "Bán nhà Phường 13 Phú Nhuận",
]

export const supportServices = [
  "Tư vấn phong thủy",
  "Dự tính chi phí làm nhà",
  "Tính lãi suất",
  "Quy trình xây nhà",
  "Xem tuổi làm nhà",
]
