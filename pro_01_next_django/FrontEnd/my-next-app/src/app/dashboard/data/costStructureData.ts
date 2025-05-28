import type { CostPeriod } from "./types"

export const costStructureData: CostPeriod[] = [
  {
    period: "2020Q4",
    segments: [
      { label: "Giá vốn", value: 65, color: "#3498db" },
      { label: "CP BH", value: 8, color: "#f39c12" },
      { label: "CP QL", value: 14, color: "#2ecc71" },
      { label: "CP TC", value: 7, color: "#e74c3c" },
      { label: "CP khác", value: 6, color: "#9b59b6" },
    ],
  },
  {
    period: "2020Q3",
    segments: [
      { label: "Giá vốn", value: 75, color: "#3498db" },
      { label: "CP BH", value: 5, color: "#f39c12" },
      { label: "CP QL", value: 6, color: "#2ecc71" },
      { label: "CP TC", value: 8, color: "#e74c3c" },
      { label: "CP khác", value: 6, color: "#9b59b6" },
    ],
  },
  {
    period: "2021Q2",
    segments: [
      { label: "Giá vốn", value: 66, color: "#3498db" },
      { label: "CP BH", value: 8, color: "#f39c12" },
      { label: "CP QL", value: 14, color: "#2ecc71" },
      { label: "CP TC", value: 5, color: "#e74c3c" },
      { label: "CP khác", value: 7, color: "#9b59b6" },
    ],
  },
  {
    period: "2021Q1",
    segments: [
      { label: "Giá vốn", value: 67, color: "#3498db" },
      { label: "CP BH", value: 8, color: "#f39c12" },
      { label: "CP QL", value: 11, color: "#2ecc71" },
      { label: "CP TC", value: 8, color: "#e74c3c" },
      { label: "CP khác", value: 6, color: "#9b59b6" },
    ],
  },
]
