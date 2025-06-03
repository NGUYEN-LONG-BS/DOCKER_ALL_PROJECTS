import "bootstrap/dist/css/bootstrap.min.css"
import { ReportDashboard } from "./components/ReportDashboard"
import "./styles.css"

export default function MyReportDashboardPage() {
  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <ReportDashboard />
      </div>
    </div>
  )
}
