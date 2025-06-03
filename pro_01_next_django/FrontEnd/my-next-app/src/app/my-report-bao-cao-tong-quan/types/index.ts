export interface ChartDataPoint {
  label: string
  value: number
}

export interface ReportCardProps {
  title: string
  percentage: number
  chartData: ChartDataPoint[]
  color: string
}
