"use client"

import React, { useMemo, useState } from "react"
import domToImage from "dom-to-image" // Import dom-to-image
import type { ChartDataItem } from "../data/chartData"

interface StepChartProps {
  data: ChartDataItem[]
  chartHeight?: number
  chartWidth?: number
}

const StepChart: React.FC<StepChartProps> = ({ data, chartHeight = 400, chartWidth = 900 }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null)

  const parseValue = (valueStr: string): number => {
    const numbers = valueStr.split("-").map((num) => Number.parseInt(num))
    return numbers.length > 1 ? numbers[1] : numbers[0]
  }

  const cumulativeData = useMemo(() => {
    let cumulative = 0
    return data.map((item) => {
      const value = parseValue(item.value)
      const startY = cumulative
      cumulative += value
      return { ...item, startY, endY: cumulative, height: value, actualValue: value }
    })
  }, [data])

  // maxValue không tính cột cuối cùng
  const maxValue = cumulativeData.length > 1
    ? Math.max(...cumulativeData.slice(0, -1).map((item) => item.endY))
    : 0;
  console.log("maxValue", maxValue)
  const valueToPixel = (value: number): number => (value / maxValue) * chartHeight
  const columnWidth = Math.min(chartWidth / data.length, 100)

  // Hàm xuất biểu đồ ra PNG
  const handleExport = async () => {
    const chartElement = document.querySelector(".step-chart-container") as HTMLElement
    if (chartElement) {
      try {
        const dataUrl = await domToImage.toPng(chartElement, { bgcolor: "#f5f7fa" })
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "step-chart.png"
        link.click()
      } catch (error) {
        console.error("Lỗi khi xuất hình ảnh:", error)
        alert("Không thể xuất hình ảnh. Vui lòng kiểm tra console để biết thêm chi tiết.")
      }
    }
  }

  return (
    <div className="container-fluid py-4 step-chart-container">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="text-end mb-3">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleExport}
              aria-label="Xuất biểu đồ ra file PNG"
            >
              Xuất PNG
            </button>
          </div>

          <div
            className="position-relative mx-auto mb-5"
            style={{
              height: `${chartHeight + 100}px`,
              maxWidth: `${chartWidth + 100}px`,
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
            role="graphics-document"
            aria-label="Biểu đồ bậc thang phân tích tác động theo lĩnh vực"
          >
            <div
              className="position-absolute"
              style={{ left: "50px", top: "20px", bottom: "80px", width: "2px", backgroundColor: "#dee2e6" }}
            />
            <div
              className="position-absolute"
              style={{ left: "50px", right: "20px", bottom: "80px", height: "2px", backgroundColor: "#dee2e6" }}
            />

            {cumulativeData.map((item, index) => {
              const isLast = index === cumulativeData.length - 1;
              // Nếu là cột cuối cùng, bắt đầu từ Y=0
              const startY = isLast ? 0 : item.startY;
              const height = isLast ? item.height : item.height;
              return (
                <div key={item.id}>
                  <div
                    className="position-absolute d-flex align-items-center justify-content-center text-white fw-bold chart-column"
                    style={{
                      left: `${50 + index * (columnWidth + 10)}px`,
                      bottom: `${80 + valueToPixel(startY)}px`,
                      width: isLast ? `${columnWidth + 20}px` : `${columnWidth}px`,
                      height: `${valueToPixel(height)}px`,
                      backgroundColor: item.color,
                      borderRadius: "6px",
                      fontSize: isLast ? "16px" : "13px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    role="img"
                    aria-label={`Cột biểu đồ ${item.label} với giá trị ${item.value} tỷ USD`}
                    tabIndex={0}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      // Lấy vị trí chuột tương đối với container biểu đồ
                      const chartElement = document.querySelector(".step-chart-container") as HTMLElement;
                      if (chartElement) {
                        const rect = chartElement.getBoundingClientRect();
                        setTooltip({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                          content: `${item.label}: ${item.value} tỷ USD`,
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      setTooltip(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        alert(`${item.label}: ${item.value} tỷ USD`);
                      }
                    }}
                  >
                    <span>{item.value}</span>
                  </div>

                  {index < cumulativeData.length - 1 && (
                    <div
                      className="position-absolute"
                      style={{
                        left: `${50 + columnWidth + index * (columnWidth + 10)}px`,
                        bottom: `${80 + valueToPixel(item.endY)}px`,
                        width: "10px",
                        height: "2px",
                        backgroundColor: "#6c757d",
                        opacity: 0.5,
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Sinh các mốc trục Y tự động dựa trên giá trị lớn nhất */}
            {(() => {
              const yTicks = [];
              const numTicks = 3; // số lượng mốc muốn hiển thị
              const lastCol = cumulativeData[cumulativeData.length - 1];
              const maxTick = lastCol ? lastCol.height : 0;
              for (let i = 0; i <= numTicks; i++) {
                const value = Math.round((maxTick * i) / numTicks);
                yTicks.push(value);
              }
              return yTicks.map((value) => (
                <div
                  key={value}
                  className="position-absolute text-muted small"
                  style={{
                    left: "20px",
                    bottom: `${80 + valueToPixel(value) - 8}px`,
                    fontSize: "12px",
                  }}
                >
                  {value}
                </div>
              ));
            })()}

            {tooltip && (
              <div
                className="chart-tooltip"
                style={{
                  left: `${tooltip.x + 2}px`,
                  top: `${tooltip.y - 10}px`,
                }}
              >
                {tooltip.content}
              </div>
            )}

            {/* Label tuyệt đối dưới mỗi cột */}
            {cumulativeData.map((item, index) => {
              const isLast = index === cumulativeData.length - 1;
              const left = 50 + index * (columnWidth + 10);
              const width = isLast ? columnWidth + 20 : columnWidth;
              return (
                <div
                  key={`label-${item.id}`}
                  style={{
                    position: "absolute",
                    left: `${left}px`,
                    bottom: `0px`,
                    width: `${width}px`,
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  <div className="mb-2" style={{ fontSize: "24px" }}>{item.icon}</div>
                  <div className="fw-bold text-dark small text-wrap">{item.label}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default StepChart