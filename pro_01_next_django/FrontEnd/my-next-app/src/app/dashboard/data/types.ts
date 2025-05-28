export interface FinancialItem {
  id: number
  description: string
  currentPeriod: number
  samePeriod: number
  variance: number
  percentage: number
}

export interface CostSegment {
  label: string
  value: number
  color: string
}

export interface CostPeriod {
  period: string
  segments: CostSegment[]
}

export interface ChartDataPoint {
  period: string
  value: number
  label: string
}

export interface ProfitChart {
  title: string
  data: ChartDataPoint[]
  trendPoints: number[]
  maxScale: number
}
