import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b sticky top-0 z-50 bg-white dark:bg-gray-900">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 bg-emerald-500 flex items-center justify-center text-white font-bold rounded">
                <span className="text-xl">W</span>
                <span className="absolute top-0 right-0 text-xs">3</span>
              </div>
              <span className="font-semibold hidden sm:inline-block">LearnCode</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <div className="relative group">
                <button className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                  Tutorials
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 border rounded-md shadow-md p-2 w-48 z-50">
                  <Link
                    href="/tutorials/html"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    HTML
                  </Link>
                  <Link
                    href="/tutorials/css"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    CSS
                  </Link>
                  <Link
                    href="/tutorials/javascript"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    JavaScript
                  </Link>
                  <Link
                    href="/tutorials/python"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Python
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                  Exercises
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 border rounded-md shadow-md p-2 w-48 z-50">
                  <Link
                    href="/exercises/html"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    HTML Exercises
                  </Link>
                  <Link
                    href="/exercises/css"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    CSS Exercises
                  </Link>
                  <Link
                    href="/exercises/javascript"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    JavaScript Exercises
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                  Certificates
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 border rounded-md shadow-md p-2 w-48 z-50">
                  <Link
                    href="/certificates/html"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    HTML Certificate
                  </Link>
                  <Link
                    href="/certificates/css"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    CSS Certificate
                  </Link>
                  <Link
                    href="/certificates/javascript"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    JavaScript Certificate
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 border rounded-md shadow-md p-2 w-48 z-50">
                  <Link
                    href="/services/hosting"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Web Hosting
                  </Link>
                  <Link
                    href="/services/spaces"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Spaces
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-gray-100 dark:bg-gray-800 border-none py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle theme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 dark:hidden"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden h-5 w-5 dark:block"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </button>

            <button className="hidden md:flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
              <span className="text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              Plus
            </button>

            <button className="hidden md:block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
              Spaces
            </button>

            <button className="hidden md:block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
              For Teachers
            </button>

            <button className="hidden lg:block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
              Get Certified
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm">
              Sign In
            </button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-[#282A35] text-white overflow-x-auto">
          <div className="container mx-auto flex items-center h-12 px-4 gap-4 whitespace-nowrap">
            <Link href="/html" className="px-2 py-1 hover:bg-black/20 rounded">
              HTML
            </Link>
            <Link href="/css" className="px-2 py-1 hover:bg-black/20 rounded">
              CSS
            </Link>
            <Link href="/javascript" className="px-2 py-1 hover:bg-black/20 rounded">
              JAVASCRIPT
            </Link>
            <Link href="/sql" className="px-2 py-1 hover:bg-black/20 rounded">
              SQL
            </Link>
            <Link href="/python" className="px-2 py-1 hover:bg-black/20 rounded">
              PYTHON
            </Link>
            <Link href="/java" className="px-2 py-1 hover:bg-black/20 rounded">
              JAVA
            </Link>
            <Link href="/php" className="px-2 py-1 hover:bg-black/20 rounded">
              PHP
            </Link>
            <Link href="/howto" className="px-2 py-1 hover:bg-black/20 rounded">
              HOW TO
            </Link>
            <Link href="/w3css" className="px-2 py-1 hover:bg-black/20 rounded">
              W3.CSS
            </Link>
            <Link href="/c" className="px-2 py-1 hover:bg-black/20 rounded">
              C
            </Link>
            <Link href="/cpp" className="px-2 py-1 hover:bg-black/20 rounded">
              C++
            </Link>
            <Link href="/csharp" className="px-2 py-1 hover:bg-black/20 rounded">
              C#
            </Link>
            <Link href="/bootstrap" className="px-2 py-1 bg-emerald-500 rounded">
              BOOTSTRAP
            </Link>
            <Link href="/react" className="px-2 py-1 hover:bg-black/20 rounded">
              REACT
            </Link>
            <Link href="/mysql" className="px-2 py-1 hover:bg-black/20 rounded">
              MYSQL
            </Link>
            <Link href="/jquery" className="px-2 py-1 hover:bg-black/20 rounded">
              JQUERY
            </Link>
            <Link href="/excel" className="px-2 py-1 hover:bg-black/20 rounded">
              EXCEL
            </Link>
            <Link href="/xml" className="px-2 py-1 hover:bg-black/20 rounded">
              XML
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r hidden md:block overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Bootstrap 5 Tutorial</h2>
          </div>
          <nav className="p-0">
            <Link href="/bootstrap/home" className="block px-4 py-2 bg-emerald-500 text-white">
              BS5 HOME
            </Link>
            <Link href="/bootstrap/get-started" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Get Started
            </Link>
            <Link href="/bootstrap/containers" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Containers
            </Link>
            <Link href="/bootstrap/grid" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Grid Basic
            </Link>
            <Link href="/bootstrap/typography" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Typography
            </Link>
            <Link href="/bootstrap/colors" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Colors
            </Link>
            <Link href="/bootstrap/tables" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Tables
            </Link>
            <Link href="/bootstrap/images" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Images
            </Link>
            <Link href="/bootstrap/jumbotron" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Jumbotron
            </Link>
            <Link href="/bootstrap/alerts" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Alerts
            </Link>
            <Link href="/bootstrap/buttons" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Buttons
            </Link>
            <Link href="/bootstrap/button-groups" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Button Groups
            </Link>
            <Link href="/bootstrap/badges" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Badges
            </Link>
            <Link href="/bootstrap/progress" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Progress Bars
            </Link>
            <Link href="/bootstrap/spinners" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              BS5 Spinners
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 flex">
          <div className="flex-1 p-6 max-w-4xl">
            <div className="flex justify-end mb-4">
              <button className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Bootstrap 5 Tutorial</h1>

            <div className="flex justify-between mb-6">
              <button className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 rotate-180"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>{" "}
                Home
              </button>
              <button className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1">
                Next{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Learn Bootstrap 5</h2>
              <p className="mb-4">
                Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript
                framework for creating responsive, mobile-first websites.
              </p>
              <p className="mb-6">Bootstrap 5 is completely free to download and use!</p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded">
                Start learning Bootstrap 5 now »
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Try it Yourself Examples</h2>
            <p className="mb-4">This tutorial contains hundreds of Bootstrap 5 examples.</p>
            <p className="mb-6">
              With our online editor, you can edit the code, and click on a button to view the result.
            </p>

            <div className="border rounded-lg p-4 mb-8">
              <h3 className="text-xl font-bold mb-4">Bootstrap 5 Example</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Example code preview would appear here</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded">
                  Try it Yourself »
                </button>
              </div>
            </div>
          </div>

          {/* Advertisements */}
          <div className="w-64 p-4 hidden lg:block">
            <div className="text-xs text-gray-500 mb-2">ADVERTISEMENT</div>
            <div className="border rounded-lg h-96 flex items-center justify-center text-gray-400 mb-4">
              Advertisement Space
            </div>
            <div className="border rounded-lg h-96 flex items-center justify-center text-gray-400">
              Advertisement Space
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
