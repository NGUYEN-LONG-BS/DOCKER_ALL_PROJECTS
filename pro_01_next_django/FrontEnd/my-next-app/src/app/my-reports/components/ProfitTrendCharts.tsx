import { profitTrendData } from "../data/profitTrendData"
import type { ProfitChart } from "../data/types"

export default function ProfitTrendCharts() {
  const renderMiniChart = (chartInfo: ProfitChart, index: number) => {
    const maxBarValue = Math.max(...chartInfo.data.map((d) => d.value))

    return (
      <div key={index} className="mini-chart">
        <div className="mini-chart-title">{chartInfo.title}</div>
        <div style={{ position: "relative", height: "140px", paddingRight: "30px" }}>
          {/* Y-axis scale */}
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              height: "100%",
              width: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "#666",
            }}
          >
            <span>{chartInfo.maxScale.toFixed(2)}</span>
            <span>{(chartInfo.maxScale * 0.5).toFixed(2)}</span>
            <span>0</span>
          </div>

          {/* Bars */}
          <div
            style={{
              display: "flex",
              alignItems: "end",
              height: "100px",
              paddingRight: "30px",
              gap: "4px",
            }}
          >
            {chartInfo.data.map((item, barIndex) => {
              const barHeight = (item.value / maxBarValue) * 80
              return (
                <div
                  key={barIndex}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  {/* Value label on top */}
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "2px",
                      height: "12px",
                    }}
                  >
                    {item.label}
                  </div>
                  {/* Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: `${barHeight}px`,
                      backgroundColor: "#3498db",
                      borderRadius: "2px",
                      marginTop: "auto",
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Trend line */}
          <svg
            style={{
              position: "absolute",
              top: "12px",
              left: "0",
              width: "calc(100% - 30px)",
              height: "100px",
              pointerEvents: "none",
            }}
          >
            <defs>
              <linearGradient id={`trendGradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f39c12" />
                <stop offset="100%" stopColor="#e67e22" />
              </linearGradient>
            </defs>

            {/* Trend line */}
            <polyline
              fill="none"
              stroke="#f39c12"
              strokeWidth="2"
              points={chartInfo.trendPoints
                .map((point: number, pointIndex: number) => {
                  const x = (pointIndex / (chartInfo.trendPoints.length - 1)) * 100
                  const y = 80 - (point / chartInfo.maxScale) * 80
                  return `${x}%,${y}`
                })
                .join(" ")}
            />

            {/* Trend points */}
            {chartInfo.trendPoints.map((point: number, pointIndex: number) => {
              const x = (pointIndex / (chartInfo.trendPoints.length - 1)) * 100
              const y = 80 - (point / chartInfo.maxScale) * 80
              return <circle key={pointIndex} cx={`${x}%`} cy={y} r="3" fill="#f39c12" stroke="#fff" strokeWidth="1" />
            })}
          </svg>

          {/* Period labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              paddingRight: "30px",
            }}
          >
            {chartInfo.data.map((item, labelIndex) => (
              <span
                key={labelIndex}
                style={{
                  fontSize: "9px",
                  color: "#666",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {item.period}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <div className="chart-title">
        XU HƯỚNG LỢI NHUẬN
        <div style={{ float: "right", fontSize: "12px", fontWeight: "normal" }}>
          <span style={{ color: "#3498db" }}>●</span> Giá trị <span style={{ color: "#f39c12" }}>●</span> Tỷ lệ/DT
        </div>
      </div>

      <div className="row">
        <div className="col-6">{renderMiniChart(profitTrendData[0], 0)}</div>
        <div className="col-6">{renderMiniChart(profitTrendData[1], 1)}</div>
      </div>

      <div className="row">
        <div className="col-6">{renderMiniChart(profitTrendData[2], 2)}</div>
        <div className="col-6">{renderMiniChart(profitTrendData[3], 3)}</div>
      </div>
    </div>
  )
}
