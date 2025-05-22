"use client"
import type React from "react"
import { useState, useEffect } from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Check for dark mode preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
      setTheme("light")
    }

    // Add event listener for theme toggle buttons
    const handleThemeToggle = () => {
      if (theme === "light") {
        localStorage.theme = "dark"
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else {
        localStorage.theme = "light"
        document.documentElement.classList.remove("dark")
        setTheme("light")
      }
    }

    const themeToggleButtons = document.querySelectorAll("[aria-label='Toggle theme']")
    themeToggleButtons.forEach((button) => {
      button.addEventListener("click", handleThemeToggle)
    })

    return () => {
      themeToggleButtons.forEach((button) => {
        button.removeEventListener("click", handleThemeToggle)
      })
    }
  }, [theme])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>LearnCode - Web Development Tutorials</title>
        <meta
          name="description"
          content="Learn web development, programming, and more with interactive tutorials and examples."
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        {children}
      </body>
    </html>
  )
}
