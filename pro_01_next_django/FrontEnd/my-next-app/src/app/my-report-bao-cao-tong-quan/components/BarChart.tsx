"use client"

import { useEffect, useState } from "react"
import type { ChartDataPoint } from "../types"
import { getMaxValue, formatLabel } from "../utils/chartUtils"

interface BarChartProps {
  data: ChartDataPoint[]
  color: string
}

export function BarChart({ data, color }: BarChartProps) {
  const [animatedData, setAnimatedData] = useState<ChartDataPoint[]>(data.map((item) => ({ ...item, value: 0 })))

  const maxValue = getMaxValue(data)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 200)
    return () => clearTimeout(timer)
  }, [data])

  return (
    <div className="bar-chart-container">
      <div className="chart-area">
        <div className="bars-container d-flex align-items-end justify-content-between">
          {animatedData.map((item, index) => {
            const height = (item.value / maxValue) * 100
            return (
              <div key={index} className="bar-wrapper text-center flex-fill">
                <div className="bar-container position-relative">
                  <div
                    className="bar"
                    style={{
                      height: `${height}%`,
                      backgroundColor: color,
                      transition: "height 1s ease-in-out",
                    }}
                  />
                  <div className="bar-value">{item.value.toLocaleString()}</div>
                </div>
                <div className="bar-label">{formatLabel(item.label)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
