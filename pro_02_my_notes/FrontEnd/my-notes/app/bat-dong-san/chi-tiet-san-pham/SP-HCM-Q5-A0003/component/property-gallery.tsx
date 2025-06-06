"use client"

import { useState } from "react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="gallery-container">
      <div className="main-image-container" style={{ height: "400px", overflow: "hidden" }}>
        <img src={images[currentImage] || "/placeholder.svg"} alt={title} className="main-image" />
        <div className="image-counter">
          {currentImage + 1} / {images.length}
        </div>
        <button className="gallery-nav-btn" onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}>
          ❯
        </button>
      </div>

      <div className="thumbnail-grid">
        {images.slice(0, 6).map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`${title} ${index + 1}`}
            className={`thumbnail ${currentImage === index ? "active" : ""}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
}
