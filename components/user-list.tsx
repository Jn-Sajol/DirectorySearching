import prisma from "@/lib/prisma"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneIcon, MailIcon, MapPinIcon, BriefcaseIcon, PencilIcon } from "lucide-react"

interface UserListProps {
  search?: string
  profession?: string
}

export default async function UserList({ search = "", profession = "" }: UserListProps) {
  // Build the where clause for Prisma query
  const where: any = {}

  if (search) {
    where.fullName = {
      contains: search,
      mode: "insensitive",
    }
  }

  if (profession && profession !== "all") {
    where.profession = profession
  }

  // Fetch users from the database
  const users = await prisma.user.findMany({
    where,
    orderBy: {
      fullName: "asc",
    },
  })

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No members found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{user.fullName}</CardTitle>
              <Badge>{user.profession}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <BriefcaseIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span>{user.jobLocation}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span>{user.presentAddress}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{user.helpDescription}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${user.phoneNumber}`} className="text-sm hover:underline">
                {user.phoneNumber}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${user.email}`} className="text-sm hover:underline">
                {user.email}
              </a>
            </div>
            <div className="flex gap-2 w-full mt-2">
              <Link href={`/profile/${user.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              {/* <Link href={`/profile/${user.id}/edit`}>
                <Button variant="secondary" className="flex items-center gap-1">
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </Button>
              </Link> */}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
