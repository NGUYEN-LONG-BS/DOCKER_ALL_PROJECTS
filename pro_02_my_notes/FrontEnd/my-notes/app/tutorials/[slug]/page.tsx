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
        <h2 className="text-2xl font-bold mb-4">Learn {params.slug.toUpperCase()}</h2>
        <p className="mb-6">{tutorial.description}</p>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded">
          Start learning {params.slug.toUpperCase()} now »
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Examples in Each Chapter</h2>
      <p className="mb-6">
        Our "{params.slug.toUpperCase()}" tutorial will help you to learn quickly and efficiently, with practical
        examples.
      </p>

      <div className="border rounded-lg p-4 mb-8">
        <h3 className="text-xl font-bold mb-4">{params.slug.toUpperCase()} Example</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Example code preview would appear here</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded">
            Try it Yourself »
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-10">
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
    </div>
  )
}
