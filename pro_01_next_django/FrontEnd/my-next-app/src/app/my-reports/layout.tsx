import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CFO Dashboard - Báo Cáo Kết Quả Kinh Doanh",
  description: "Dashboard báo cáo tài chính",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="dashboard-layout">{children}</div>
}
