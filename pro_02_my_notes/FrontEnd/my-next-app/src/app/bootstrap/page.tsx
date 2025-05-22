import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BootstrapPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
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
          Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript framework
          for creating responsive, mobile-first websites.
        </p>
        <p className="mb-6">Bootstrap 5 is completely free to download and use!</p>
        <Button className="bg-emerald-500 hover:bg-emerald-600">Start learning Bootstrap 5 now »</Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Try it Yourself Examples</h2>
      <p className="mb-4">This tutorial contains hundreds of Bootstrap 5 examples.</p>
      <p className="mb-6">With our online editor, you can edit the code, and click on a button to view the result.</p>

      <div className="border rounded-lg p-4 mb-8">
        <h3 className="text-xl font-bold mb-4">Bootstrap 5 Example</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
          <p className="text-gray-500">Example code preview would appear here</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-emerald-500 hover:bg-emerald-600">Try it Yourself »</Button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Bootstrap 5 vs. Bootstrap 4</h2>
      <p className="mb-4">
        Bootstrap 5 is the newest version of Bootstrap; with new components, faster stylesheet and more responsiveness.
      </p>
      <p className="mb-4">
        Bootstrap 5 supports the latest, stable releases of all major browsers and platforms. However, Internet Explorer
        11 and down is not supported.
      </p>
      <p className="mb-6">The main differences between Bootstrap 5 and Bootstrap 4 are:</p>

      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Bootstrap 5 has switched to vanilla JavaScript instead of jQuery</li>
        <li>Bootstrap 5 has improved grid system</li>
        <li>Bootstrap 5 has improved form elements and form validation</li>
        <li>Bootstrap 5 has new utility classes</li>
        <li>Bootstrap 5 has improved customization options</li>
      </ul>

      <div className="flex justify-between mt-10">
        <Button variant="outline" className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 rotate-180" /> Home
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
