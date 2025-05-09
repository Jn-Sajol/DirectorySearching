import UserList from "./user-list"
import { Prisma } from "@prisma/client"

interface UserListWrapperProps {
  search?: string
  profession?: string
}

export default async function UserListWrapper({ search = "", profession = "" }: UserListWrapperProps) {
  // Build the where clause for Prisma query
  const where: Prisma.UserWhereInput = {}

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
  // const users = await prisma.user.findMany({
  //   where,
  //   orderBy: {
  //     fullName: "asc",
  //   },
  // })

  return <UserList search={search} profession={profession} />

}
