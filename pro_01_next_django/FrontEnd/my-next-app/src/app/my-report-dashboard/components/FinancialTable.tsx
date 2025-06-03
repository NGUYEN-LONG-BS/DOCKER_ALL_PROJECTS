import { financialData } from "../data/financialData"
import { formatNumber, getVarianceColor } from "../utils/formatters"
import type { FinancialItem } from "../data/types"

interface FinancialTableProps {
  selectedYear: string
  selectedQuarter: string
}

export default function FinancialTable({ selectedYear, selectedQuarter }: FinancialTableProps) {
  const getVarianceBar = (variance: number) => {
    const isPositive = variance >= 0
    // Scale the bar width based on the absolute value of variance
    const maxVariance = 100 // Approximate max value for scaling
    const width = Math.min((Math.abs(variance) / maxVariance) * 100, 80) // Max 80% width

    return (
      <div
        style={{
          position: "relative",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Center divider line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            height: "100%",
            width: "1px",
            backgroundColor: "#e0e0e0",
            transform: "translateX(-50%)",
          }}
        ></div>

        {/* Bar */}
        {Math.abs(variance) > 0.1 && (
          <div
            style={{
              position: "absolute",
              left: isPositive ? "50%" : `calc(50% - ${width}%)`,
              width: `${width}%`,
              height: "12px",
              backgroundColor: isPositive ? "#28a745" : "#dc3545",
              borderRadius: "2px",
            }}
          ></div>
        )}

        {/* Value text */}
        <div
          style={{
            position: "absolute",
            right: isPositive ? "auto" : "50%",
            left: isPositive ? "50%" : "auto",
            paddingLeft: isPositive ? "5px" : "0",
            paddingRight: isPositive ? "0" : "5px",
            fontSize: "12px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {isPositive ? formatNumber(variance) : ""}
        </div>
        <div
          style={{
            position: "absolute",
            left: isPositive ? "auto" : "50%",
            right: isPositive ? "50%" : "auto",
            paddingRight: isPositive ? "0" : "5px",
            paddingLeft: isPositive ? "5px" : "0",
            fontSize: "12px",
            fontWeight: "500",
            color: "#333",
            textAlign: "right",
          }}
        >
          {!isPositive ? `-${formatNumber(variance)}` : ""}
        </div>
      </div>
    )
  }

  return (
    <div className="financial-table">
      <div className="chart-title">
        BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH
      </div>
      <div className="table-responsive">
        <table className="table table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: "40%", textAlign: "left" }}>Chi tiêu</th>
              <th style={{ width: "12%" }}>Kỳ này</th>
              <th style={{ width: "12%" }}>Cùng kỳ NT</th>
              <th style={{ width: "20%" }}>Chênh lệch</th>
              <th style={{ width: "16%" }}>Tỷ lệ</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((item: FinancialItem) => (
              <tr key={item.id}>
                <td>
                  <span style={{ marginRight: "8px", color: "#666" }}>{item.id}.</span>
                  {item.description}
                </td>
                <td style={{ textAlign: "right" }}>{formatNumber(item.currentPeriod)}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(item.samePeriod)}</td>
                <td>{getVarianceBar(item.variance)}</td>
                <td className={getVarianceColor(item.variance)} style={{ textAlign: "right" }}>
                  {item.percentage > 0 ? "+" : ""}
                  {item.percentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
