import type { ChartDataPoint } from "../types"

export function calculateCircumference(radius: number): number {
  return 2 * Math.PI * radius
}

export function calculateStrokeDasharray(percentage: number, circumference: number): number {
  return circumference - (percentage / 100) * circumference
}

export function getMaxValue(data: ChartDataPoint[]): number {
  return Math.max(...data.map((item) => item.value))
}

export function formatLabel(label: string): string {
  return label.length > 8 ? `${label.substring(0, 6)}...` : label
}

export function formatNumber(num: number): string {
  return num.toLocaleString("vi-VN")
}

export function calculatePercentageChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}
