import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { email: string } }) {
  try {
    const email = decodeURIComponent(params.email)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
