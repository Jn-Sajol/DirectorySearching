import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        profession: true,
      },
      distinct: ["profession"],
    })

    const professions = users.map((user) => user.profession)

    return NextResponse.json({ professions })
  } catch (error) {
    console.error("Error fetching professions:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect() // add this
  }
}
