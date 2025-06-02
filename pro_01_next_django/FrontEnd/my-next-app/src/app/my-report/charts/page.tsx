"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ChartsPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/my-report")
  }, [router])

  return null
}
