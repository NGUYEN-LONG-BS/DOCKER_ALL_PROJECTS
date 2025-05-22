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
    <div className="container py-4 mx-auto" style={{ maxWidth: "900px" }}>
      <h1 className="display-5 fw-bold mb-4">{tutorial.title}</h1>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i className="bi bi-chevron-left"></i> Home
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="bg-light p-4 rounded mb-5">
        <h2 className="fs-2 fw-bold mb-3">Learn {params.slug.toUpperCase()}</h2>
        <p className="mb-4">{tutorial.description}</p>
        <button className="btn btn-success">Start learning {params.slug.toUpperCase()} now »</button>
      </div>

      <h2 className="fs-2 fw-bold mb-3">Examples in Each Chapter</h2>
      <p className="mb-4">
        Our "{params.slug.toUpperCase()}" tutorial will help you to learn quickly and efficiently, with practical
        examples.
      </p>

      <div className="border rounded p-4 mb-5">
        <h3 className="fs-4 fw-bold mb-3">{params.slug.toUpperCase()} Example</h3>
        <div
          className="bg-light p-4 rounded mb-3 d-flex align-items-center justify-content-center"
          style={{ height: "250px" }}
        >
          <p className="text-muted">Example code preview would appear here</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success">Try it Yourself »</button>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i className="bi bi-chevron-left"></i> Home
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
