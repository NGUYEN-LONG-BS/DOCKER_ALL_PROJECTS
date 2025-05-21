import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import "bootstrap/dist/css/bootstrap.min.css"

// Khởi tạo font Inter với subsets latin
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Login/Subscribe Page",
  description: "A beautiful login and subscribe interface",
}


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</> // Chỉ trả về children, không định nghĩa <html> hoặc <body>
}