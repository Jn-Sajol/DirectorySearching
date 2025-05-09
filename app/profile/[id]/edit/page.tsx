"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon } from "lucide-react"
import { toast } from "sonner"

interface UserData {
  id: string
  fullName: string
  presentAddress: string
  permanentAddress: string
  jobLocation: string
  profession: string
  helpDescription: string
  phoneNumber: string
  email: string
}

export default function EditProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<UserData | null>(null)
  const [secretKey, setSecretKey] = useState("")

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/users/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        setFormData(data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast("Failed to load user data"
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (formData) {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (secretKey !== "786") {
      toast( "The secret key you entered is incorrect.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update profile")
      }

      toast( "Your profile has been updated successfully.")

      router.push(`/profile/${params.id}`)
    } catch (error) {
      console.error("Update error:", error)
      toast( error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !formData) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p>Loading profile data...</p>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p>User not found</p>
        <Link href="/">
          <Button className="mt-4">Back to Directory</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href={`/profile/${params.id}`}
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Profile</span>
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="presentAddress">Present Address</Label>
                <Textarea
                  id="presentAddress"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="jobLocation">Job Location / Workplace</Label>
                <Input
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="helpDescription">How you can help (short description)</Label>
                <Textarea
                  id="helpDescription"
                  name="helpDescription"
                  value={formData.helpDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="secretKey">Secret Key</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
              <Link href={`/profile/${params.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
