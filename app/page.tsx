import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UserList from "@/components/user-list"
import SearchForm from "@/components/search-form"
import EditProfileButton from "@/components/editProfileButton"

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search?: string; profession?: string }
}) {
  const search = searchParams.search || ""
  const profession = searchParams.profession || ""

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header + Edit Profile */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 text-center md:text-left">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl font-bold ">Jashore Foundation</h1>
          <p className="text-muted-foreground">Find community members by profession or name</p>
        </div>
        <div className="w-full md:w-auto">
          <EditProfileButton />
        </div>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Members</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm initialSearch={search} initialProfession={profession} />
        </CardContent>
      </Card>

      {/* User List */}
      <Suspense fallback={<div>Loading members...</div>}>
        <UserList search={search} profession={profession} />
      </Suspense>
    </div>
  )
}
