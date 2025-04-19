"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { db } from "@/lib/db"
import type { MemberFormData } from "@/lib/types"

const SECRET_CODE = "123" // In production, use environment variable

const memberSchema = z.object({
    name: z.string().min(2),
    profession: z.string().min(2),
    permanentAddress: z.string().min(5),
    currentAddress: z.string().min(5),
    skills: z.array(z.string()).min(1),
    phone: z.string().min(11),
    email: z.string().email().optional().or(z.literal("")),
    facebookProfile: z.string().url().optional().or(z.literal("")),
    secretCode: z.string().min(1),
    password: z.string().min(6),
})

export async function registerMember(data: MemberFormData) {
    const validatedData = memberSchema.parse(data)

    // Verify secret code
    if (validatedData.secretCode !== SECRET_CODE) {
        throw new Error("সিক্রেট কোড সঠিক নয়")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create member in database
    await db.member.create({
        data: {
            name: validatedData.name,
            profession: validatedData.profession,
            permanentAddress: validatedData.permanentAddress,
            currentAddress: validatedData.currentAddress,
            skills: validatedData.skills,
            phone: validatedData.phone,
            email: validatedData.email || undefined,
            facebookProfile: validatedData.facebookProfile || undefined,
            password: hashedPassword,
        },
    })

    revalidatePath("/")
}

