export interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

export interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

export interface NavigationItem {
  id: number
  title: string
  href: string
}
