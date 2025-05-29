import type { Product, Feature, NavigationItem } from "@/types/trang-diem-co-dau"

export const navigationItems: NavigationItem[] = [
  { id: 1, title: "TRANG CHỦ", href: "/" },
  { id: 2, title: "CÔ DÂU", href: "/co-dau" },
  { id: 3, title: "SỰ KIỆN", href: "/su-kien" },
  { id: 4, title: "ĐI TỆC - ĐI CHƠI", href: "/di-tec" },
  { id: 5, title: "KỶ YẾU - TỐT NGHIỆP", href: "/ky-yeu" },
  { id: 6, title: "MẪU ẢNH - THỜI TRANG", href: "/mau-anh" },
]

export const features: Feature[] = [
  {
    id: 1,
    icon: "🚚",
    title: "GIAO HÀNG NHANH",
    description: "Cho tất cả đơn hàng",
  },
  {
    id: 2,
    icon: "🛡️",
    title: "SẢN PHẨM AN TOÀN",
    description: "Cam kết chất lượng",
  },
  {
    id: 3,
    icon: "📞",
    title: "HỖ TRỢ 24/7",
    description: "Tất cả ngày trong tuần",
  },
  {
    id: 4,
    icon: "💰",
    title: "HOÀN LẠI TIỀN",
    description: "Nếu không hài lòng",
  },
]

export const products: Product[] = [
  {
    id: 1,
    title: "Cô dâu lung linh",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_01-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 2,
    title: "Cô dâu quyến rũ",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_02-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 3,
    title: "Mẫu ảnh cuốn hút",
    price: 500000,
    image: "/trang-diem-co-dau/products/MAU_ANH_01-00.jpg?height=300&width=300",
    category: "mau-anh",
  },
  {
    id: 4,
    title: "Giao diện đi chơi siêu xịn",
    price: 500000,
    image: "/trang-diem-co-dau/products/SU_KIEN_01-00.jpg?height=300&width=300",
    category: "di-choi",
  },
  {
    id: 5,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_03-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 6,
    title: "Giao diện đi xuất ngất ngây",
    price: 500000,
    image: "/trang-diem-co-dau/products/SU_KIEN_02-00.jpg?height=300&width=300",
    category: "su-kien",
  },
  {
    id: 7,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_04-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 8,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_05-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 9,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_06-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 10,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_07-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 11,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_08-00.jpg?height=300&width=300",
    category: "co-dau",
  },
  {
    id: 12,
    title: "Cô dâu kiều sa",
    price: 500000,
    image: "/trang-diem-co-dau/products/DAM_CUOI_09-00.jpg?height=300&width=300",
    category: "co-dau",
  },
]
