"use client"

import { CircularProgress } from "./CircularProgress"
import { BarChart } from "./BarChart"
import type { ReportCardProps } from "../types"

export function ReportCard({ title, percentage, chartData, color }: ReportCardProps) {
  return (
    <div className="report-card h-100">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body p-3">
          <h6 className="card-title text-muted mb-3 fw-semibold">{title}</h6>
          <div className="row align-items-center">
            <div className="col-4">
              <CircularProgress percentage={percentage} color={color} />
            </div>
            <div className="col-8">
              <BarChart data={chartData} color={color} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
