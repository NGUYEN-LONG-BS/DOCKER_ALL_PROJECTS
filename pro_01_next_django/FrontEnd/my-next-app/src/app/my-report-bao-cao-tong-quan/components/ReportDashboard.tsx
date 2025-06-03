"use client"

import { ReportCard } from "./ReportCard"
import { reportData } from "../data/sampleData"

export function ReportDashboard() {
  return (
    <div className="dashboard-container">
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0 fw-bold">BÁO CÁO TỔNG QUAN</h2>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            {reportData.map((data, index) => (
              <div key={index} className="col-lg-6 col-md-12">
                <ReportCard {...data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
