import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TutorialData {
  [key: string]: {
    title: string
    description: string
  }
}

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorialData: TutorialData = {
    html: {
      title: "HTML Tutorial",
      description:
        "HTML is the standard markup language for Web pages. With HTML you can create your own Website. HTML is easy to learn - You will enjoy it!",
    },
    css: {
      title: "CSS Tutorial",
      description:
        "CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed. This tutorial will teach you CSS from basic to advanced.",
    },
    javascript: {
      title: "JavaScript Tutorial",
      description:
        "JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
    },
    python: {
      title: "Python Tutorial",
      description:
        "Python is a popular programming language. Python can be used on a server to create web applications.",
    },
  }

  const tutorial = tutorialData[params.slug] || {
    title: `${params.slug.toUpperCase()} Tutorial`,
    description: `Learn ${params.slug.toUpperCase()} with our easy to follow tutorials.`,
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{tutorial.title}</h1>

      <div className="flex justify-between mb-6">
        <Button variant="outline" className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 rotate-180" /> Home
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-emerald-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Learn {params.slug.toUpperCase()}</h2>
        <p className="mb-6">{tutorial.description}</p>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          Start learning {params.slug.toUpperCase()} now »
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Examples in Each Chapter</h2>
      <p className="mb-6">
        Our "{params.slug.toUpperCase()}" tutorial will help you to learn quickly and efficiently, with practical
        examples.
      </p>

      <div className="border rounded-lg p-4 mb-8">
        <h3 className="text-xl font-bold mb-4">{params.slug.toUpperCase()} Example</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
          <p className="text-gray-500">Example code preview would appear here</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-emerald-500 hover:bg-emerald-600">Try it Yourself »</Button>
        </div>
      </div>

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
