"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

export default function AuthButtons() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem("currentUserId")
    if (id) {
      setUserId(id)
    }
  }, [])

  return (
     <>
      {userId ? (
  <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2">
    <Link href={`/profile/${userId}/edit`}>
    <Button variant="secondary" className="flex items-center gap-1 cursor-pointer">
      <PencilIcon className="h-4 w-4" />
      Edit Your Profile
    </Button>
  </Link>
  </div>
) : (
  <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2">
    <p className="text-muted-foreground">Please register to join our community</p>
    <Link href="/register">
      <Button className=" cursor-pointer">Register</Button>
    </Link>
  </div>
)}

    </>
  )
}
