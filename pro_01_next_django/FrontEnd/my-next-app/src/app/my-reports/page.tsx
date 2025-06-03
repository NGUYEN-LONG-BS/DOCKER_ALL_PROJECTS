"use client"

import { useState } from "react"
import FinancialTable from "./components/FinancialTable"
import CostStructureChart from "./components/CostStructureChart"
import ProfitTrendCharts from "./components/ProfitTrendCharts"
import Link from "next/link";
import { ReportDashboardTab02 } from "./components/ReportDashboardTab02"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedQuarter, setSelectedQuarter] = useState("Q4")
  const [activeTab, setActiveTab] = useState<'tab01' | 'tab02' | 'tab03'>('tab01')

  return (
    <div className="min-vh-100">
      {/* Header */}
      <div className="col-md-8">
        <div className="d-flex align-items-center">
          <div>
            <Link href="/">
              <img src="/images/logo-Light.jpg" alt="Tuan An Group" className="me-2" style={{ height: "40px" }} />
            </Link>
          </div>
          <div className="company-name">TUẤN ÂN GROUP</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center bg-gray-100 pt-6 pb-2 border-b border-gray-200">
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
      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {activeTab === 'tab01' && (
          <>
            {/* Header */}
            <div className="dashboard-header">
              <div className="container-fluid">
                <div className="row align-items-center">
                  
                  <div className="col-md-4 text-end">
                    <div className="report-title">
                      <div className="report-title-line">BÁO CÁO KẾT QUẢ KINH DOANH</div>
                    </div>
                  </div>
                </div>
                {/* Year and Quarter Selector */}
                <div className="selector-container">
                  <div className="year-selector">
                    <div className="selector-row">
                      <button className={`selector-btn ${selectedYear === "2018" ? "active" : ""}`} onClick={() => setSelectedYear("2018")}>2018</button>
                      <button className={`selector-btn ${selectedYear === "2019" ? "active" : ""}`} onClick={() => setSelectedYear("2019")}>2019</button>
                      <button className={`selector-btn ${selectedYear === "2020" ? "active" : ""}`} onClick={() => setSelectedYear("2020")}>2020</button>
                    </div>
                    <div className="selector-row">
                      <button className={`selector-btn ${selectedYear === "2021" ? "active" : ""}`} onClick={() => setSelectedYear("2021")}>2021</button>
                      <button className={`selector-btn ${selectedYear === "2022" ? "active" : ""}`} onClick={() => setSelectedYear("2022")}>2022</button>
                      <button className={`selector-btn ${selectedYear === "2023" ? "active" : ""}`} onClick={() => setSelectedYear("2023")}>2023</button>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className="quarter-selector">
                    <div className="selector-row">
                      <button className={`selector-btn ${selectedQuarter === "Q1" ? "active" : ""}`} onClick={() => setSelectedQuarter("Q1")}>Q1</button>
                      <button className={`selector-btn ${selectedQuarter === "Q3" ? "active" : ""}`} onClick={() => setSelectedQuarter("Q3")}>Q3</button>
                    </div>
                    <div className="selector-row">
                      <button className={`selector-btn ${selectedQuarter === "Q2" ? "active" : ""}`} onClick={() => setSelectedQuarter("Q2")}>Q2</button>
                      <button className={`selector-btn ${selectedQuarter === "Q4" ? "active" : ""}`} onClick={() => setSelectedQuarter("Q4")}>Q4</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="container-fluid py-4">
              <div className="row">
                {/* Financial Table */}
                <div className="col-lg-8">
                  <FinancialTable 
                    selectedYear={selectedYear} 
                    selectedQuarter={selectedQuarter} />
                </div>
                {/* Charts */}
                <div className="col-lg-4">
                  <CostStructureChart />
                  <ProfitTrendCharts />
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="footer-info">Báo cáo tài chính</div>
          </>
        )}
        {activeTab === 'tab02' && (
          <div className="p-4">
            <ReportDashboardTab02 />
          </div>
        )}
        {activeTab === 'tab03' && (
          <div className="p-8 text-center text-gray-500 text-lg">(Nội dung báo cáo hàng tồn kho sẽ cập nhật sau)</div>
        )}
      </div>
    </div>
  )
}
