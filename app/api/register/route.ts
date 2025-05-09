import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, presentAddress, permanentAddress, jobLocation, profession, helpDescription, phoneNumber, email } =
      body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Create user in Supabase (for authentication)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password: `${fullName.replace(/\s+/g, "")}${phoneNumber.slice(-4)}`, // Simple password generation
    })

    if (authError) {
      return NextResponse.json({ message: "Error creating authentication: " + authError.message }, { status: 500 })
    }

    // Create user in Prisma database
    const user = await prisma.user.create({
      data: {
        fullName,
        presentAddress,
        permanentAddress,
        jobLocation,
        profession,
        helpDescription,
        phoneNumber,
        email,
      },
    })

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
