"use client"
import PerformanceChart, { type PerformanceData } from "@/components/charts/myBarChart/barChartNum01-perfomment"

// Sample data - replace with your actual data
const sampleData: PerformanceData[] = [
  { year: 2022, quarter: "Q1", miss: 1, hit: 84, exceed: 15 },
  { year: 2022, quarter: "Q2", miss: 2, hit: 93, exceed: 5 },
  { year: 2022, quarter: "Q3", miss: 3, hit: 87, exceed: 10 },
  { year: 2022, quarter: "Q4", miss: 2, hit: 80, exceed: 18 },
  { year: 2023, quarter: "Q1", miss: 5, hit: 85, exceed: 15 },
  { year: 2023, quarter: "Q2", miss: 6, hit: 80, exceed: 14 },
  { year: 2023, quarter: "Q3", miss: 3, hit: 85, exceed: 12 },
  { year: 2023, quarter: "Q4", miss: 2, hit: 82, exceed: 16 },
  { year: 2024, quarter: "Q1", miss: 6, hit: 76, exceed: 18 },
  { year: 2024, quarter: "Q2", miss: 1, hit: 79, exceed: 20 },
  { year: 2024, quarter: "Q3", miss: 10, hit: 85, exceed: 5 },
  { year: 2024, quarter: "Q4", miss: 3, hit: 79, exceed: 18 },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Performance Dashboard</h1>

        {/* Basic usage */}
        <PerformanceChart 
          data={sampleData} 
          title="Project Performance Trends" 
          showTable={false} 
          className="mb-12" 
          width={400}
          height={300}
        />

        {/* Custom colors example */}
        <PerformanceChart
          data={sampleData}
          title="Custom Colored Chart"
          colors={{
            miss: "#ef4444", // red-500
            hit: "#10b981", // emerald-500
            exceed: "#3b82f6", // blue-500
          }}
          showTable={true}
          className="mb-12"
        />
      </div>
    </main>
  )
}
