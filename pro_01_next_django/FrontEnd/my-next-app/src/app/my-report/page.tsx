"use client"
import Link from "next/link"
import { BarChart3, TrendingUp, ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import PerformanceChart, { type PerformanceData } from "../../components/performance-chart"
import MiniPerformanceChart from "../../components/mini-performance-chart"

// Sample data sets
const sampleData2022: PerformanceData[] = [
  { year: 2022, quarter: "Q1", miss: 1, hit: 84, exceed: 15 },
  { year: 2022, quarter: "Q2", miss: 2, hit: 93, exceed: 5 },
  { year: 2022, quarter: "Q3", miss: 3, hit: 87, exceed: 10 },
  { year: 2022, quarter: "Q4", miss: 2, hit: 80, exceed: 18 },
]

const sampleData2023: PerformanceData[] = [
  { year: 2023, quarter: "Q1", miss: 5, hit: 85, exceed: 15 },
  { year: 2023, quarter: "Q2", miss: 6, hit: 80, exceed: 14 },
  { year: 2023, quarter: "Q3", miss: 3, hit: 85, exceed: 12 },
  { year: 2023, quarter: "Q4", miss: 2, hit: 82, exceed: 16 },
]

const sampleData2024: PerformanceData[] = [
  { year: 2024, quarter: "Q1", miss: 6, hit: 76, exceed: 18 },
  { year: 2024, quarter: "Q2", miss: 1, hit: 79, exceed: 20 },
  { year: 2024, quarter: "Q3", miss: 10, hit: 85, exceed: 5 },
  { year: 2024, quarter: "Q4", miss: 3, hit: 79, exceed: 18 },
]

const allData: PerformanceData[] = [...sampleData2022, ...sampleData2023, ...sampleData2024]

const colorSchemes = {
  default: { miss: "#FF6347", hit: "#D3D3D3", exceed: "#808080" },
  modern: { miss: "#ef4444", hit: "#10b981", exceed: "#3b82f6" },
  warm: { miss: "#f97316", hit: "#eab308", exceed: "#84cc16" },
  cool: { miss: "#8b5cf6", hit: "#06b6d4", exceed: "#10b981" },
}

// All CSS styles for My Report section - completely self-contained
const myReportStyles = {
  // Layout styles
  container: "min-h-screen bg-gray-100",
  pageContainer: "container mx-auto px-4",

  // Home page styles for My Report
  homePage: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center",
  homeContainer: "max-w-4xl mx-auto px-6 text-center",
  homeHeader: "mb-12",
  homeTitle: "text-5xl font-bold text-gray-800 mb-4",
  homeDescription: "text-xl text-gray-600 max-w-2xl mx-auto",
  homeFooter: "mt-16 text-gray-500",

  // Navigation grid and cards
  navGrid: "grid md:grid-cols-2 gap-8 max-w-3xl mx-auto",
  navCard:
    "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2",
  navCardContent: "flex flex-col items-center",
  navCardIcon:
    "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors",
  navCardIconPurple:
    "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors",
  navCardTitle: "text-2xl font-bold text-gray-800 mb-4",
  navCardDescription: "text-gray-600 mb-6 leading-relaxed",
  navCardLink: "inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700",
  navCardLinkPurple: "inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700",
  navCardArrow: "w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform",

  // Header styles
  header: "bg-white shadow-sm border-b",
  headerContainer: "container mx-auto px-4 py-4",
  headerContent: "flex items-center justify-between",
  backLink: "inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors",
  pageTitle: "text-2xl font-bold text-gray-800",
  navLink: "text-purple-600 hover:text-purple-700 font-medium",
  navLinkBlue: "text-blue-600 hover:text-blue-700 font-medium",

  // Main content styles
  mainContent: "py-8",
  chartSpacing: "space-y-12",

  // Chart container styles
  chartContainer: "bg-white rounded-lg shadow-lg p-6",
  chartTitle: "text-lg font-semibold mb-4 text-center text-gray-800",
  yearGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6",

  // Mini charts styles
  miniChartsContainer: "bg-white rounded-xl shadow-lg p-6",
  miniChartsTitle: "text-xl font-bold text-gray-800 mb-6 text-center",
  miniChartsGrid: "grid grid-cols-2 lg:grid-cols-4 gap-6",

  // Mini chart cards with different color schemes
  miniChartCard: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4",
  miniChartCardGreen: "bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4",
  miniChartCardOrange: "bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4",
  miniChartCardPurple: "bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4",

  // Mini chart titles with matching colors
  miniChartTitle: "text-sm font-semibold text-blue-800 mb-3",
  miniChartTitleGreen: "text-sm font-semibold text-green-800 mb-3",
  miniChartTitleOrange: "text-sm font-semibold text-orange-800 mb-3",
  miniChartTitlePurple: "text-sm font-semibold text-purple-800 mb-3",

  // Detailed mini charts grid
  detailedMiniGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

  // Spacing utilities
  spacingY8: "space-y-8",

  // Error/fallback page styles
  errorContainer: "min-h-screen flex items-center justify-center",
  errorContent: "text-center",
  errorTitle: "text-2xl font-bold mb-4",
  errorLink: "text-blue-600 hover:underline",
}

export default function MyReportPage() {
  const pathname = usePathname()

  // Render home page for My Report
  if (pathname === "/my-report") {
    return (
      <div className={myReportStyles.homePage}>
        <div className={myReportStyles.homeContainer}>
          {/* Header */}
          <div className={myReportStyles.homeHeader}>
            <h1 className={myReportStyles.homeTitle}>Performance Dashboard</h1>
            <p className={myReportStyles.homeDescription}>
              Visualize your project performance data with interactive charts and comprehensive analytics
            </p>
          </div>

          {/* Navigation Cards */}
          <div className={myReportStyles.navGrid}>
            {/* Full Charts Page */}
            <Link href="/my-report/charts" className="group">
              <div className={myReportStyles.navCard}>
                <div className={myReportStyles.navCardContent}>
                  <div className={myReportStyles.navCardIcon}>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className={myReportStyles.navCardTitle}>Full Charts</h2>
                  <p className={myReportStyles.navCardDescription}>
                    Comprehensive performance analysis with detailed charts, year-by-year comparisons, and in-depth
                    insights
                  </p>
                  <div className={myReportStyles.navCardLink}>
                    View Full Dashboard
                    <svg className={myReportStyles.navCardArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Mini Charts Page */}
            <Link href="/my-report/mini-charts" className="group">
              <div className={myReportStyles.navCard}>
                <div className={myReportStyles.navCardContent}>
                  <div className={myReportStyles.navCardIconPurple}>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className={myReportStyles.navCardTitle}>Mini Charts</h2>
                  <p className={myReportStyles.navCardDescription}>
                    Quick overview with compact charts perfect for monitoring key metrics and trends at a glance
                  </p>
                  <div className={myReportStyles.navCardLinkPurple}>
                    View Mini Dashboard
                    <svg className={myReportStyles.navCardArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className={myReportStyles.homeFooter}>
            <p>Choose your preferred view to start analyzing performance data</p>
          </div>
        </div>
      </div>
    )
  }

  // Render charts page
  if (pathname === "/my-report/charts") {
    return (
      <div className={myReportStyles.container}>
        {/* Header */}
        <div className={myReportStyles.header}>
          <div className={myReportStyles.headerContainer}>
            <div className={myReportStyles.headerContent}>
              <Link href="/my-report" className={myReportStyles.backLink}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <h1 className={myReportStyles.pageTitle}>Full Performance Charts</h1>
              <Link href="/my-report/mini-charts" className={myReportStyles.navLink}>
                View Mini Charts
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className={myReportStyles.mainContent}>
          <div className={myReportStyles.pageContainer}>
            <div className={myReportStyles.chartSpacing}>
              {/* Complete Overview */}
              <PerformanceChart
                data={allData}
                title="Complete Performance Overview (2022-2024)"
                colors={colorSchemes.default}
              />

              {/* Year-by-Year Comparison */}
              <div className={myReportStyles.yearGrid}>
                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>2022 Performance</h3>
                  <PerformanceChart data={sampleData2022} title="" colors={colorSchemes.default} />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>2023 Performance</h3>
                  <PerformanceChart data={sampleData2023} title="" colors={colorSchemes.modern} />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>2024 Performance</h3>
                  <PerformanceChart data={sampleData2024} title="" colors={colorSchemes.warm} />
                </div>
              </div>

              {/* Trend Analysis */}
              <PerformanceChart data={allData} title="Trend Analysis with Custom Colors" colors={colorSchemes.cool} />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Render mini charts page
  if (pathname === "/my-report/mini-charts") {
    return (
      <div className={myReportStyles.container}>
        {/* Header */}
        <div className={myReportStyles.header}>
          <div className={myReportStyles.headerContainer}>
            <div className={myReportStyles.headerContent}>
              <Link href="/my-report" className={myReportStyles.backLink}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <h1 className={myReportStyles.pageTitle}>Mini Performance Charts</h1>
              <Link href="/my-report/charts" className={myReportStyles.navLinkBlue}>
                View Full Charts
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className={myReportStyles.mainContent}>
          <div className={myReportStyles.pageContainer}>
            <div className={myReportStyles.spacingY8}>
              {/* Quick Overview Grid */}
              <div className={myReportStyles.miniChartsContainer}>
                <h2 className={myReportStyles.miniChartsTitle}>Quick Performance Overview</h2>
                <div className={myReportStyles.miniChartsGrid}>
                  <div className={myReportStyles.miniChartCard}>
                    <h3 className={myReportStyles.miniChartTitle}>2022 Performance</h3>
                    <MiniPerformanceChart
                      data={sampleData2022}
                      title=""
                      colors={colorSchemes.default}
                      variant="compact"
                    />
                  </div>

                  <div className={myReportStyles.miniChartCardGreen}>
                    <h3 className={myReportStyles.miniChartTitleGreen}>2023 Performance</h3>
                    <MiniPerformanceChart
                      data={sampleData2023}
                      title=""
                      colors={colorSchemes.modern}
                      variant="minimal"
                    />
                  </div>

                  <div className={myReportStyles.miniChartCardOrange}>
                    <h3 className={myReportStyles.miniChartTitleOrange}>2024 Performance</h3>
                    <MiniPerformanceChart
                      data={sampleData2024}
                      title=""
                      colors={colorSchemes.warm}
                      variant="detailed"
                    />
                  </div>

                  <div className={myReportStyles.miniChartCardPurple}>
                    <h3 className={myReportStyles.miniChartTitlePurple}>Recent Trends</h3>
                    <MiniPerformanceChart
                      data={allData.slice(-4)}
                      title=""
                      colors={colorSchemes.cool}
                      variant="default"
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Mini Charts Grid */}
              <div className={myReportStyles.detailedMiniGrid}>
                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Q1 Analysis</h3>
                  <MiniPerformanceChart
                    data={[
                      { year: 2022, quarter: "Q1", miss: 1, hit: 84, exceed: 15 },
                      { year: 2023, quarter: "Q1", miss: 5, hit: 85, exceed: 15 },
                      { year: 2024, quarter: "Q1", miss: 6, hit: 76, exceed: 18 },
                    ]}
                    title="Q1 Comparison"
                    colors={colorSchemes.default}
                    variant="detailed"
                  />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Q2 Analysis</h3>
                  <MiniPerformanceChart
                    data={[
                      { year: 2022, quarter: "Q2", miss: 2, hit: 93, exceed: 5 },
                      { year: 2023, quarter: "Q2", miss: 6, hit: 80, exceed: 14 },
                      { year: 2024, quarter: "Q2", miss: 1, hit: 79, exceed: 20 },
                    ]}
                    title="Q2 Comparison"
                    colors={colorSchemes.modern}
                    variant="detailed"
                  />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Q3 Analysis</h3>
                  <MiniPerformanceChart
                    data={[
                      { year: 2022, quarter: "Q3", miss: 3, hit: 87, exceed: 10 },
                      { year: 2023, quarter: "Q3", miss: 3, hit: 85, exceed: 12 },
                      { year: 2024, quarter: "Q3", miss: 10, hit: 85, exceed: 5 },
                    ]}
                    title="Q3 Comparison"
                    colors={colorSchemes.warm}
                    variant="detailed"
                  />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Q4 Analysis</h3>
                  <MiniPerformanceChart
                    data={[
                      { year: 2022, quarter: "Q4", miss: 2, hit: 80, exceed: 18 },
                      { year: 2023, quarter: "Q4", miss: 2, hit: 82, exceed: 16 },
                      { year: 2024, quarter: "Q4", miss: 3, hit: 79, exceed: 18 },
                    ]}
                    title="Q4 Comparison"
                    colors={colorSchemes.cool}
                    variant="detailed"
                  />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Latest Quarter</h3>
                  <MiniPerformanceChart
                    data={allData.slice(-1)}
                    title="Current Performance"
                    colors={colorSchemes.default}
                    variant="compact"
                  />
                </div>

                <div className={myReportStyles.chartContainer}>
                  <h3 className={myReportStyles.chartTitle}>Best Performance</h3>
                  <MiniPerformanceChart
                    data={[{ year: 2022, quarter: "Q2", miss: 2, hit: 93, exceed: 5 }]}
                    title="Peak Performance"
                    colors={colorSchemes.modern}
                    variant="minimal"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Default fallback
  return (
    <div className={myReportStyles.errorContainer}>
      <div className={myReportStyles.errorContent}>
        <h1 className={myReportStyles.errorTitle}>Page Not Found</h1>
        <Link href="/my-report" className={myReportStyles.errorLink}>
          Return to My Report
        </Link>
      </div>
    </div>
  )
}
