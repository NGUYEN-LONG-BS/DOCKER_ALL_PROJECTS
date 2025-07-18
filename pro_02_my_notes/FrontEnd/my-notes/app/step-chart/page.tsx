import StepChart from "./components/StepChart"
import { chartData } from "./data/chartData"

export default function Home() {
  return (
    <main className="min-vh-100 py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold text-primary mb-3">Biểu Đồ Bậc Thang</h1>
              <p className="lead text-muted">Phân tích tác động theo từng lĩnh vực</p>
            </div>
            <StepChart data={chartData} chartHeight={400} chartWidth={900} />
          </div>
        </div>
      </div>
    </main>
  )
}