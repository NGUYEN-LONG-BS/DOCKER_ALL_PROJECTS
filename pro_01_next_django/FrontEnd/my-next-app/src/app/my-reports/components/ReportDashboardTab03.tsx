import MiniPerformanceChart from "@/components/charts/myBarChart/mini-performance-chart"
import PerformanceChart from "@/components/charts/myBarChart/performance-chart"
import BarChartNum01PerfommentNotable from "@/components/charts/myBarChart/barChartNum01-perfomment-notable"
import BarChartNum01Perfomment from "@/components/charts/myBarChart/barChartNum01-perfomment"
import { useMemo } from "react"

// Sample data for demonstration (replace with real data as needed)
const sampleData = [
  { year: 2023, quarter: "Q1", miss: 10, hit: 60, exceed: 30 },
  { year: 2023, quarter: "Q2", miss: 15, hit: 55, exceed: 30 },
  { year: 2023, quarter: "Q3", miss: 8, hit: 62, exceed: 30 },
  { year: 2023, quarter: "Q4", miss: 12, hit: 58, exceed: 30 },
  { year: 2024, quarter: "Q1", miss: 9, hit: 61, exceed: 30 },
  { year: 2024, quarter: "Q2", miss: 11, hit: 59, exceed: 30 },
  { year: 2024, quarter: "Q3", miss: 9, hit: 61, exceed: 30 },
  { year: 2024, quarter: "Q4", miss: 11, hit: 59, exceed: 30 },
  { year: 2025, quarter: "Q1", miss: 9, hit: 61, exceed: 30 },
  { year: 2025, quarter: "Q2", miss: 11, hit: 59, exceed: 30 },
  { year: 2025, quarter: "Q3", miss: 9, hit: 61, exceed: 30 },
  { year: 2025, quarter: "Q4", miss: 11, hit: 59, exceed: 30 },
]

export function ReportDashboardTab03() {
  // Memoize chart data if needed
  const miniChartData = useMemo(() => sampleData, [])
  const perfChartData = useMemo(() => sampleData, [])

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-lg-4 col-md-12">
          <MiniPerformanceChart
            data={miniChartData}
            title="Hiệu suất dự án (Mini)"
            colors={{ miss: "#FF6347", hit: "#D3D3D3", exceed: "#808080" }}
            variant="default"
          />
        </div>
        <div className="col-lg-8 col-md-12">
          <PerformanceChart
            data={perfChartData}
            title="Hiệu suất dự án tổng thể"
            colors={{ miss: "#FF6347", hit: "#D3D3D3", exceed: "#808080" }}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <BarChartNum01PerfommentNotable
            data={sampleData}
            title="Hiệu suất nổi bật"
            width={400}
            height={300}
          />
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <BarChartNum01Perfomment 
            data={sampleData} 
            title="Hiệu suất tổng thể" 
            width={500} 
            height={300} />
        </div>

        <div className="col-lg-3 col-md-12 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0 fw-bold">Hiệu suất nổi bật</h5>
            </div>
            <div className="card-body p-3">
              <BarChartNum01PerfommentNotable
                data={sampleData}
                title=""
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0 fw-bold">Hiệu suất nổi bật</h5>
            </div>
            <div className="card-body p-3">
              <BarChartNum01PerfommentNotable
                data={sampleData}
                title=""
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
