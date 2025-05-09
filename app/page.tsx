import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import UserList from "@/components/user-list"
import SearchForm from "@/components/search-form"

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search?: string; profession?: string }
}) {
  const search = searchParams.search || ""
  const profession = searchParams.profession || ""

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="">
          <h1 className="text-3xl font-bold">Jashore Foundation Directory</h1>
          <p className="text-muted-foreground">Find community members by profession or name</p>
        </div>
        <div className="flex gap-4">
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Members</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm initialSearch={search} initialProfession={profession} />
        </CardContent>
      </Card>

      <Suspense fallback={<div>Loading members...</div>}>
        <UserList search={search} profession={profession} />
      </Suspense>
    </div>
  )
}
