"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06b6d4] mx-auto mb-4"></div>
        <p className="text-[#78829d]">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
