import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import path as necessary

export async function GET(
  request: Request,
  context: { params: { id: string } } // Explicitly define the type here
) {
  const { params } = context;

  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } } // Explicitly define the type here
) {
  const { params } = context;

  try {
    const body = await request.json();
    const { fullName, presentAddress, permanentAddress, jobLocation, profession, helpDescription, phoneNumber, email } =
      body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if email is already taken by another user
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json({ message: "Email is already taken by another user" }, { status: 400 });
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
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
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
