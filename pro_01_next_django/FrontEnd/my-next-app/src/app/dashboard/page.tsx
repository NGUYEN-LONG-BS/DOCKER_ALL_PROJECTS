"use client"

import { useState } from "react"
import FinancialTable from "./components/FinancialTable"
import CostStructureChart from "./components/CostStructureChart"
import ProfitTrendCharts from "./components/ProfitTrendCharts"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedQuarter, setSelectedQuarter] = useState("Q4")

  return (
    <div className="min-vh-100">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <div className="logo-circle">
                  <div>
                    <div style={{ fontSize: "24px", lineHeight: "1", fontWeight: "bold", color: "#2c3e50" }}>CFO</div>
                    <div style={{ fontSize: "8px", lineHeight: "1", color: "#2c3e50" }}>www.cfo.vn</div>
                  </div>
                </div>
                <div className="company-name">TUẤN ÂN GROUP</div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="report-title">
                <div className="report-title-line">BÁO CÁO</div>
                <div className="report-title-line">KẾT QUẢ KINH DOANH</div>
              </div>
            </div>
          </div>

          {/* Year and Quarter Selector */}
          <div className="selector-container">
            <div className="year-selector">
              <div className="selector-row">
                <button
                  className={`selector-btn ${selectedYear === "2018" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2018")}
                >
                  2018
                </button>
                <button
                  className={`selector-btn ${selectedYear === "2019" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2019")}
                >
                  2019
                </button>
                <button
                  className={`selector-btn ${selectedYear === "2020" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2020")}
                >
                  2020
                </button>
              </div>
              <div className="selector-row">
                <button
                  className={`selector-btn ${selectedYear === "2021" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2021")}
                >
                  2021
                </button>
                <button
                  className={`selector-btn ${selectedYear === "2022" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2022")}
                >
                  2022
                </button>
                <button
                  className={`selector-btn ${selectedYear === "2023" ? "active" : ""}`}
                  onClick={() => setSelectedYear("2023")}
                >
                  2023
                </button>
              </div>
            </div>
            <div className="separator"></div>
            <div className="quarter-selector">
              <div className="selector-row">
                <button
                  className={`selector-btn ${selectedQuarter === "Q1" ? "active" : ""}`}
                  onClick={() => setSelectedQuarter("Q1")}
                >
                  Q1
                </button>
                <button
                  className={`selector-btn ${selectedQuarter === "Q3" ? "active" : ""}`}
                  onClick={() => setSelectedQuarter("Q3")}
                >
                  Q3
                </button>
              </div>
              <div className="selector-row">
                <button
                  className={`selector-btn ${selectedQuarter === "Q2" ? "active" : ""}`}
                  onClick={() => setSelectedQuarter("Q2")}
                >
                  Q2
                </button>
                <button
                  className={`selector-btn ${selectedQuarter === "Q4" ? "active" : ""}`}
                  onClick={() => setSelectedQuarter("Q4")}
                >
                  Q4
                </button>
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
            <FinancialTable selectedYear={selectedYear} selectedQuarter={selectedQuarter} />
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
    </div>
  )
}
