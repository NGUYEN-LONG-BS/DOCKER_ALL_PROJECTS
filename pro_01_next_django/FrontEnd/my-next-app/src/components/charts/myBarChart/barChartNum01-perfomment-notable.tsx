"use client"

import { useEffect, useRef } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type Plugin } from "chart.js"
import { Chart } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface PerformanceData {
  year: number
  quarter: string
  miss: number
  hit: number
  exceed: number
}

export interface PerformanceChartProps {
  data: PerformanceData[]
  title?: string
  colors?: {
    miss: string
    hit: string
    exceed: string
  }
  className?: string
  yearBackgroundColors?: string[]
  yearTextColors?: string[]
  width?: number
  height?: number
}

const defaultColors = {
  miss: "#FF6347",
  hit: "#D3D3D3",
  exceed: "#808080",
}

const defaultYearBackgroundColors = [
  "rgba(173, 216, 230, 0)", // Light Blue for 2022
  "rgba(144, 238, 144, 0.2)", // Light Green for 2023
  "rgba(255, 182, 193, 0)", // Light Pink for 2024
]

const defaultYearTextColors = ["#000000", "#000000", "#000000"]

export default function PerformanceChart({
  data,
  title = "Project Performance Trends",
  colors = defaultColors,
  className = "",
  yearBackgroundColors = defaultYearBackgroundColors,
  yearTextColors = defaultYearTextColors,
  width = 800,
  height = 400,
}: PerformanceChartProps) {
  const chartRef = useRef<ChartJS>(null)

  // Get unique years from data
  const years = [...new Set(data.map((item) => item.year))].sort()

  // Create custom plugins
  const yearBackgroundPlugin: Plugin = {
    id: "yearBackgroundPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx
      const xAxis = chart.scales.x
      const yAxis = chart.scales.y

      ctx.save()
      years.forEach((year, index) => {
        const yearData = data.filter((item) => item.year === year)
        if (yearData.length === 0) return

        const startIndex = data.findIndex((item) => item.year === year)
        const endIndex = startIndex + yearData.length - 1

        const xStart = xAxis.getPixelForValue(startIndex)
        const xEnd = xAxis.getPixelForValue(endIndex)
        const yTop = yAxis.getPixelForValue(yAxis.max)
        const yBottom = yAxis.getPixelForValue(yAxis.min)

        ctx.fillStyle = yearBackgroundColors[index] || "rgba(0,0,0,0.1)"
        ctx.fillRect(xStart, yTop, xEnd - xStart, yBottom - yTop)
      })
      ctx.restore()
    },
  }

  const yearLabelPlugin: Plugin = {
    id: "yearLabelPlugin",
    afterDraw: (chart) => {
      const ctx = chart.ctx
      const xAxis = chart.scales.x

      ctx.save()
      ctx.font = "14px Arial"
      ctx.textAlign = "center"

      years.forEach((year, index) => {
        const yearData = data.filter((item) => item.year === year)
        if (yearData.length === 0) return

        const startIndex = data.findIndex((item) => item.year === year)
        const endIndex = startIndex + yearData.length - 1

        const xStart = xAxis.getPixelForValue(startIndex)
        const xEnd = xAxis.getPixelForValue(endIndex)
        const xCenter = (xStart + xEnd) / 2
        const y = chart.height - 10

        // Draw background for year label
        const yearBgColor = yearBackgroundColors[index] || "rgba(0,0,0,0.1)"
        ctx.fillStyle = yearBgColor
        const textWidth = ctx.measureText(year.toString()).width + 24
        const textHeight = 20
        ctx.fillRect(xCenter - textWidth / 2, y - textHeight + 6, textWidth, textHeight)

        // Draw year text
        ctx.fillStyle = yearTextColors[index] || "#000000"
        ctx.fillText(year.toString(), xCenter, y)
      })
      ctx.restore()
    },
  }

  // Register plugins
  useEffect(() => {
    ChartJS.register(yearBackgroundPlugin, yearLabelPlugin)
    return () => {
      ChartJS.unregister(yearBackgroundPlugin, yearLabelPlugin)
    }
  }, [])

  // Prepare chart data
  const labels = data.map((row) => `${row.year} ${row.quarter}`)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Miss",
        data: data.map((row) => row.miss),
        backgroundColor: colors.miss,
      },
      {
        label: "Hit",
        data: data.map((row) => row.hit),
        backgroundColor: colors.hit,
      },
      {
        label: "Exceed",
        data: data.map((row) => row.exceed),
        backgroundColor: colors.exceed,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 20 },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: true,
          callback: (value: any, index: number) => {
            return labels[index]?.split(" ")[1] || "" // Display only the quarter
          },
          font: { size: 14 },
        },
        title: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        stacked: true,
        title: { display: false },
        grid: { display: false },
        max: 100,
        min: 0,
      },
    },
    layout: {
      padding: {
        bottom: 30, // Space for year labels
      },
    },
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`} style={{ maxWidth: width }}>
      {/* Chart Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="w-full" style={{ minHeight: height, height }}>
          <Chart 
            ref={chartRef} 
            type="bar" 
            data={chartData} 
            options={chartOptions}
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  )
}
