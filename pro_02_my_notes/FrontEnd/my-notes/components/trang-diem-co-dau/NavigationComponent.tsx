"use client"

import { useState, useEffect } from "react"
import type React from "react"

interface NavigationItem {
  id: number
  title: string
  href: string
}

interface NavigationComponentProps {
  items: NavigationItem[]
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({ items }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [showGoToTop, setShowGoToTop] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY

      // If we're scrolling down and past 200px, hide the navbar
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      }
      // If we're scrolling up or at the top, show the navbar
      else if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      }

      // Show/hide go to top button based on scroll position
      if (currentScrollY > 300) {
        setShowGoToTop(true)
      } else {
        setShowGoToTop(false)
      }

      // Update last scroll position
      setLastScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-white border-top navigation-bar ${isVisible ? "navigation-visible" : "navigation-hidden"}`}
      >
        <div className="container">
          {/* Always show navigation items - remove collapse behavior */}
          <div className="w-100">
            <ul className="navbar-nav mx-auto d-flex justify-content-center">
              {items.map((item) => (
                <li key={item.id} className="nav-item">
                  <a className="nav-link nav-link-new px-4 py-3" href={item.href}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Go to top button */}
      <button className={`go-to-top-btn ${showGoToTop ? "show" : ""}`} onClick={scrollToTop} aria-label="Go to top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  )
}

export default NavigationComponent
