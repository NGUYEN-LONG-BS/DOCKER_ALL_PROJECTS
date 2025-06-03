import type { ProfitChart } from "./types"

export const profitTrendData: ProfitChart[] = [
  {
    title: "LN gộp",
    data: [
      { period: "2021Q2", value: 70, label: "70bn" },
      { period: "2020Q3", value: 42, label: "42bn" },
      { period: "2020Q4", value: 37, label: "37bn" },
      { period: "2021Q1", value: 52, label: "52bn" },
    ],
    trendPoints: [0.3, 0.25, 0.18, 0.15],
    maxScale: 0.3,
  },
  {
    title: "LN HĐKD",
    data: [
      { period: "2020Q4", value: 95, label: "95bn" },
      { period: "2021Q2", value: 90, label: "90bn" },
      { period: "2020Q3", value: 88, label: "88bn" },
      { period: "2021Q1", value: 75, label: "75bn" },
    ],
    trendPoints: [0.12, 0.11, 0.1, 0.12],
    maxScale: 0.12,
  },
  {
    title: "LN trước thuế",
    data: [
      { period: "2020Q4", value: 85, label: "85bn" },
      { period: "2021Q2", value: 70, label: "70bn" },
      { period: "2020Q3", value: 75, label: "75bn" },
      { period: "2021Q1", value: 60, label: "60bn" },
    ],
    trendPoints: [0.11, 0.09, 0.1, 0.12],
    maxScale: 0.12,
  },
  {
    title: "LN sau thuế",
    data: [
      { period: "2020Q4", value: 70, label: "70bn" },
      { period: "2020Q3", value: 60, label: "60bn" },
      { period: "2021Q1", value: 55, label: "55bn" },
      { period: "2021Q2", value: 45, label: "45bn" },
    ],
    trendPoints: [0.04, 0.035, 0.03, 0.02],
    maxScale: 0.04,
  },
]
