"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Header() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)

      if (data.session) {
        // Fetch the user's ID from the database
        try {
          const response = await fetch(`/api/users/email/${data.session.user.email}`)
          if (response.ok) {
            const userData = await response.json()
            setUserId(userData.user.id)
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    toast("You have been logged out successfully.")
  }

  if (isLoading) {
    return null
  }

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Jashore Foundation
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className={pathname === "/" ? "font-medium" : ""}>
              Directory
            </Link>
            {isLoggedIn ? (
              <>
                {userId && (
                  <Link href={`/profile/${userId}`}>
                    <Button variant="ghost">My Profile</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
