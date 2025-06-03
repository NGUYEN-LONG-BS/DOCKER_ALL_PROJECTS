import { costStructureData } from "../../data/costStructureData"

export default function CostStructureChart() {
  return (
    <div className="chart-container">
      <div className="chart-title">CẤU TRÚC CHI PHÍ</div>

      {costStructureData.map((period, index) => (
        <div key={index} className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="fw-bold">{period.period}</small>
          </div>
          <div className="cost-structure-bar">
            {period.segments.map((segment, segIndex) => (
              <div
                key={segIndex}
                className="cost-segment"
                style={{
                  width: `${segment.value}%`,
                  backgroundColor: segment.color,
                }}
              >
                {segment.value}%
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-3">
        <div className="d-flex flex-wrap justify-content-center">
          <small className="me-3">
            <span style={{ color: "#3498db" }}>●</span> Giá vốn
          </small>
          <small className="me-3">
            <span style={{ color: "#f39c12" }}>●</span> CP BH
          </small>
          <small className="me-3">
            <span style={{ color: "#2ecc71" }}>●</span> CP QL
          </small>
          <small className="me-3">
            <span style={{ color: "#e74c3c" }}>●</span> CP TC
          </small>
          <small className="me-3">
            <span style={{ color: "#9b59b6" }}>●</span> CP khác
          </small>
        </div>
      </div>
    </div>
  )
}
