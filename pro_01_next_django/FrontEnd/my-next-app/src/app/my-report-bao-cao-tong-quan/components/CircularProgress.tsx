"use client"

import { useEffect, useState } from "react"
import { calculateCircumference, calculateStrokeDasharray } from "../utils/chartUtils"

interface CircularProgressProps {
  percentage: number
  color: string
  size?: number
}

export function CircularProgress({ percentage, color, size = 120 }: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const radius = 45
  const circumference = calculateCircumference(radius)
  const strokeDasharray = calculateStrokeDasharray(animatedPercentage, circumference)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="circular-progress-container text-center">
      <div className="position-relative d-inline-block">
        <svg width={size} height={size} className="circular-progress">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e9ecef" strokeWidth="8" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDasharray}
            className="progress-circle"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="fw-bold fs-4" style={{ color }}>
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}
