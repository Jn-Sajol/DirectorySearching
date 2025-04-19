import { cache } from "react"
import { db } from "@/lib/db"
import type { Member } from "@/lib/types"
import { Prisma } from "@prisma/client"

// Separate searchMembers and filterMembers for clarity
export const searchMembers = cache(async (
    search: string,
    page: number = 1,
    pageSize: number = 12
): Promise<Member[]> => {

    const skip = (page - 1) * pageSize;

    if (!search) return [];

    try {
        const members = await db.member.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { profession: { contains: search, mode: 'insensitive' } },
                    { currentAddress: { contains: search, mode: 'insensitive' } },
                    { permanentAddress: { contains: search, mode: 'insensitive' } },
                ]
            },
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                profession: true,
                permanentAddress: true,
                currentAddress: true,
                skills: true,
                phone: true,
                email: true,
                facebookProfile: true,
                createdAt: true,
            },
        });

        return members;

    } catch (error) {
        console.error('Error searching members:', error);
        return [];
    }
});

export const filterMembers = cache(async (
    profession?: string,
    location?: string,
    skill?: string,
    page: number = 1,
    pageSize: number = 12
): Promise<Member[]> => {

    const skip = (page - 1) * pageSize;

    const where: Prisma.MemberWhereInput = {};

    if (profession) {
        where.profession = { contains: profession, mode: 'insensitive' };
    }

    if (location) {
        where.OR = [
            { currentAddress: { contains: location, mode: 'insensitive' } },
            { permanentAddress: { contains: location, mode: 'insensitive' } },
        ];
    }

    if (skill) {
        where.skills = { has: skill };
    }

    try {
        const members = await db.member.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                profession: true,
                permanentAddress: true,
                currentAddress: true,
                skills: true,
                phone: true,
                email: true,
                facebookProfile: true,
                createdAt: true,
            },
        });

        return members;

    } catch (error) {
        console.error('Error filtering members:', error);
        return [];
    }
});
