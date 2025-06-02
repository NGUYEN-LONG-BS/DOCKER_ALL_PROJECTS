"use client"

import { useRef, useEffect } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Chart } from "react-chartjs-2"
import type { PerformanceData } from "./performance-chart"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface MiniPerformanceChartProps {
  data: PerformanceData[]
  title: string
  colors: {
    miss: string
    hit: string
    exceed: string
  }
  variant?: "default" | "compact" | "minimal" | "detailed"
}

export default function MiniPerformanceChart({ data, title, colors, variant = "default" }: MiniPerformanceChartProps) {
  const chartRef = useRef<ChartJS>(null)

  // Prepare chart data
  const labels = data.map((row) => `${row.quarter}`)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Miss",
        data: data.map((row) => row.miss),
        backgroundColor: colors.miss,
        borderWidth: 0,
      },
      {
        label: "Hit",
        data: data.map((row) => row.hit),
        backgroundColor: colors.hit,
        borderWidth: 0,
      },
      {
        label: "Exceed",
        data: data.map((row) => row.exceed),
        backgroundColor: colors.exceed,
        borderWidth: 0,
      },
    ],
  }

  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
      },
      plugins: {
        title: {
          display: variant !== "minimal" && title !== "",
          text: title,
          font: { size: variant === "compact" ? 10 : 12 },
          color: "#374151",
        },
        legend: {
          display: variant === "detailed",
          position: "bottom" as const,
          labels: {
            font: { size: 8 },
            boxWidth: 8,
            color: "#374151",
          },
        },
        tooltip: {
          enabled: variant !== "minimal",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "white",
          bodyColor: "white",
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            display: variant !== "minimal",
            font: { size: 8 },
            color: "#6B7280",
          },
          title: { display: false },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          stacked: true,
          ticks: {
            display: variant === "detailed",
            font: { size: 8 },
            color: "#6B7280",
          },
          title: { display: false },
          grid: { display: variant === "detailed" },
          max: 100,
          min: 0,
        },
      },
    }

    return baseOptions
  }

  // Xử lý devicePixelRatio để cải thiện độ sắc nét
  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Đặt lại kích thước canvas với tỷ lệ pixel cao hơn
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        ctx.scale(dpr, dpr)

        // Đặt lại style để canvas hiển thị đúng kích thước
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
      }
    }
  }, [data]) // Chạy lại khi data thay đổi

  return (
    <div className="w-full h-full">
      <div className="h-20 w-full">
        <Chart
          ref={chartRef}
          type="bar"
          data={chartData}
          options={{
            ...getChartOptions(),
            devicePixelRatio: window.devicePixelRatio * 2, // Tăng độ phân giải
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      {variant === "detailed" && (
        <div className="mt-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Latest: {data[data.length - 1]?.quarter}</span>
            <span className="font-medium text-green-600">{data[data.length - 1]?.exceed}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
