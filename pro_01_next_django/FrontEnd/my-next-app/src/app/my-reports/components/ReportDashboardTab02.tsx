// Copy of ReportDashboard for use in my-reports tab 02
import { ReportCard } from "../../my-report-bao-cao-tong-quan/components/ReportCard"
import { reportData } from "../../my-report-bao-cao-tong-quan/data/sampleData"
import "../../my-report-bao-cao-tong-quan/styles.css"

export function ReportDashboardTab02() {
  return (
    <div className="dashboard-container">
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0 fw-bold">BÁO CÁO TỔNG QUAN</h2>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            {reportData.map((data, index) => (
              <div key={index} className="col-lg-6 col-md-12">
                <ReportCard {...data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
