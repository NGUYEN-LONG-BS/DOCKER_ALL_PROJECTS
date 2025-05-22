import Link from "next/link"
import { Search, ChevronDown, ChevronRight, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex items-center justify-between h-16 px-4">
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
                <Button variant="ghost" className="flex items-center gap-1">
                  Tutorials <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute hidden group-hover:block bg-background border rounded-md shadow-md p-2 w-48 z-50">
                  <Link href="/tutorials/html" className="block px-4 py-2 hover:bg-muted rounded-md">
                    HTML
                  </Link>
                  <Link href="/tutorials/css" className="block px-4 py-2 hover:bg-muted rounded-md">
                    CSS
                  </Link>
                  <Link href="/tutorials/javascript" className="block px-4 py-2 hover:bg-muted rounded-md">
                    JavaScript
                  </Link>
                  <Link href="/tutorials/python" className="block px-4 py-2 hover:bg-muted rounded-md">
                    Python
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-1">
                  Exercises <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute hidden group-hover:block bg-background border rounded-md shadow-md p-2 w-48 z-50">
                  <Link href="/exercises/html" className="block px-4 py-2 hover:bg-muted rounded-md">
                    HTML Exercises
                  </Link>
                  <Link href="/exercises/css" className="block px-4 py-2 hover:bg-muted rounded-md">
                    CSS Exercises
                  </Link>
                  <Link href="/exercises/javascript" className="block px-4 py-2 hover:bg-muted rounded-md">
                    JavaScript Exercises
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-1">
                  Certificates <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute hidden group-hover:block bg-background border rounded-md shadow-md p-2 w-48 z-50">
                  <Link href="/certificates/html" className="block px-4 py-2 hover:bg-muted rounded-md">
                    HTML Certificate
                  </Link>
                  <Link href="/certificates/css" className="block px-4 py-2 hover:bg-muted rounded-md">
                    CSS Certificate
                  </Link>
                  <Link href="/certificates/javascript" className="block px-4 py-2 hover:bg-muted rounded-md">
                    JavaScript Certificate
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-1">
                  Services <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute hidden group-hover:block bg-background border rounded-md shadow-md p-2 w-48 z-50">
                  <Link href="/services/hosting" className="block px-4 py-2 hover:bg-muted rounded-md">
                    Web Hosting
                  </Link>
                  <Link href="/services/spaces" className="block px-4 py-2 hover:bg-muted rounded-md">
                    Spaces
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted border-none"
              />
            </div>

            <ModeToggle />

            <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
              <span className="text-emerald-500">
                <Bookmark className="h-4 w-4" />
              </span>
              Plus
            </Button>

            <Button variant="ghost" size="sm" className="hidden md:flex">
              Spaces
            </Button>

            <Button variant="ghost" size="sm" className="hidden md:flex">
              For Teachers
            </Button>

            <Button variant="ghost" size="sm" className="hidden lg:flex">
              Get Certified
            </Button>

            <Button className="bg-emerald-500 hover:bg-emerald-600">Sign In</Button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-[#282A35] text-white overflow-x-auto">
          <div className="container flex items-center h-12 px-4 gap-4 whitespace-nowrap">
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
            <Link href="/bootstrap/get-started" className="block px-4 py-2 hover:bg-muted">
              BS5 Get Started
            </Link>
            <Link href="/bootstrap/containers" className="block px-4 py-2 hover:bg-muted">
              BS5 Containers
            </Link>
            <Link href="/bootstrap/grid" className="block px-4 py-2 hover:bg-muted">
              BS5 Grid Basic
            </Link>
            <Link href="/bootstrap/typography" className="block px-4 py-2 hover:bg-muted">
              BS5 Typography
            </Link>
            <Link href="/bootstrap/colors" className="block px-4 py-2 hover:bg-muted">
              BS5 Colors
            </Link>
            <Link href="/bootstrap/tables" className="block px-4 py-2 hover:bg-muted">
              BS5 Tables
            </Link>
            <Link href="/bootstrap/images" className="block px-4 py-2 hover:bg-muted">
              BS5 Images
            </Link>
            <Link href="/bootstrap/jumbotron" className="block px-4 py-2 hover:bg-muted">
              BS5 Jumbotron
            </Link>
            <Link href="/bootstrap/alerts" className="block px-4 py-2 hover:bg-muted">
              BS5 Alerts
            </Link>
            <Link href="/bootstrap/buttons" className="block px-4 py-2 hover:bg-muted">
              BS5 Buttons
            </Link>
            <Link href="/bootstrap/button-groups" className="block px-4 py-2 hover:bg-muted">
              BS5 Button Groups
            </Link>
            <Link href="/bootstrap/badges" className="block px-4 py-2 hover:bg-muted">
              BS5 Badges
            </Link>
            <Link href="/bootstrap/progress" className="block px-4 py-2 hover:bg-muted">
              BS5 Progress Bars
            </Link>
            <Link href="/bootstrap/spinners" className="block px-4 py-2 hover:bg-muted">
              BS5 Spinners
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 flex">
          <div className="flex-1 p-6 max-w-4xl">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" className="mr-2">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Bootstrap 5 Tutorial</h1>

            <div className="flex justify-between mb-6">
              <Button variant="outline" className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4 rotate-180" /> Home
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Learn Bootstrap 5</h2>
              <p className="mb-4">
                Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript
                framework for creating responsive, mobile-first websites.
              </p>
              <p className="mb-6">Bootstrap 5 is completely free to download and use!</p>
              <Button className="bg-emerald-500 hover:bg-emerald-600">Start learning Bootstrap 5 now »</Button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Try it Yourself Examples</h2>
            <p className="mb-4">This tutorial contains hundreds of Bootstrap 5 examples.</p>
            <p className="mb-6">
              With our online editor, you can edit the code, and click on a button to view the result.
            </p>

            <div className="border rounded-lg p-4 mb-8">
              <h3 className="text-xl font-bold mb-4">Bootstrap 5 Example</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
                <p className="text-gray-500">Example code preview would appear here</p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-emerald-500 hover:bg-emerald-600">Try it Yourself »</Button>
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
