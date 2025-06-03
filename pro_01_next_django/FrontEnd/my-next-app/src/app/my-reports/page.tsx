"use client"

import { useState } from "react"
import Link from "next/link";
import { ReportDashboardTab01 } from "./components/ReportDashboardTab01"
import { ReportDashboardTab02 } from "./components/ReportDashboardTab02"
import { ReportDashboardTab03 } from "./components/ReportDashboardTab03"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'tab01' | 'tab02' | 'tab03'>('tab01')

  return (
    <div className="min-vh-100">
      {/* Header & Tabs Sticky Row */}
      <div className="sticky-top bg-white z-10 border-b border-gray-200">
        <div className="container-fluid px-0">
          <div className="d-flex align-items-center justify-content-between flex-wrap py-2">
            <div className="d-flex align-items-center">
              <Link href="/">
                <img src="/images/logo-Light.jpg" alt="Tuan An Group" className="me-2" style={{ height: "40px" }} />
              </Link>
              <div className="company-name ms-2">TUẤN ÂN GROUP</div>
            </div>
            <div className="flex justify-center">
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none mr-2 shadow-sm border-b-4 ${activeTab === 'tab01' ? 'bg-white text-blue-600 border-blue-500 shadow-lg scale-105' : 'bg-gray-100 text-gray-500 border-transparent hover:bg-white hover:text-blue-500'}`}
                onClick={() => setActiveTab('tab01')}
              >
                Báo cáo KQKD
              </button>
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none mr-2 shadow-sm border-b-4 ${activeTab === 'tab02' ? 'bg-white text-blue-600 border-blue-500 shadow-lg scale-105' : 'bg-gray-100 text-gray-500 border-transparent hover:bg-white hover:text-blue-500'}`}
                onClick={() => setActiveTab('tab02')}
              >
                Báo cáo dự án
              </button>
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none shadow-sm border-b-4 ${activeTab === 'tab03' ? 'bg-white text-blue-600 border-blue-500 shadow-lg scale-105' : 'bg-gray-100 text-gray-500 border-transparent hover:bg-white hover:text-blue-500'}`}
                onClick={() => setActiveTab('tab03')}
              >
                Báo cáo hàng tồn kho
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {activeTab === 'tab01' && (
          <ReportDashboardTab01 />
        )}
        {activeTab === 'tab02' && (
          <div className="p-4">
            <ReportDashboardTab02 />
          </div>
        )}
        {activeTab === 'tab03' && (
          <div className="p-4">
            <ReportDashboardTab03 />
          </div>
        )}
      </div>
    </div>
  )
}
