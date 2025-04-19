"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MemberFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get("search") || "")
    const profession = searchParams.get("profession") || ""
    const location = searchParams.get("location") || ""
    const skill = searchParams.get("skill") || ""

    const createQueryString = (params: Record<string, string | null>) => {
        const newParams = new URLSearchParams(searchParams.toString())

        Object.entries(params).forEach(([name, value]) => {
            if (value === null || value === "") {
                newParams.delete(name)
            } else {
                newParams.set(name, value)
            }
        })

        return newParams.toString()
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`${pathname}?${createQueryString({ search })}`)
    }

    const handleFilterChange = (name: string, value: string) => {
        router.push(`${pathname}?${createQueryString({ [name]: value })}`)
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
                <Input
                    placeholder="সদস্য খুঁজুন..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </form>

            <div className="flex flex-wrap gap-3">
                <Select value={profession} onValueChange={(value) => handleFilterChange("profession", value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="প্রফেশন" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">সকল প্রফেশন</SelectItem>
                        <SelectItem value="doctor">ডাক্তার</SelectItem>
                        <SelectItem value="engineer">ইঞ্জিনিয়ার</SelectItem>
                        <SelectItem value="teacher">শিক্ষক</SelectItem>
                        <SelectItem value="businessman">ব্যবসায়ী</SelectItem>
                        <SelectItem value="student">ছাত্র/ছাত্রী</SelectItem>
                        <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="লোকেশন" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">সকল লোকেশন</SelectItem>
                        <SelectItem value="dhaka">ঢাকা</SelectItem>
                        <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                        <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                        <SelectItem value="khulna">খুলনা</SelectItem>
                        <SelectItem value="sylhet">সিলেট</SelectItem>
                        <SelectItem value="barisal">বরিশাল</SelectItem>
                        <SelectItem value="rangpur">রংপুর</SelectItem>
                        <SelectItem value="mymensingh">ময়মনসিংহ</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={skill} onValueChange={(value) => handleFilterChange("skill", value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="স্কিল" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">সকল স্কিল</SelectItem>
                        <SelectItem value="medical">মেডিকেল সাপোর্ট</SelectItem>
                        <SelectItem value="legal">আইনি সহায়তা</SelectItem>
                        <SelectItem value="education">শিক্ষা সহায়তা</SelectItem>
                        <SelectItem value="career">ক্যারিয়ার গাইডেন্স</SelectItem>
                        <SelectItem value="financial">আর্থিক সহায়তা</SelectItem>
                        <SelectItem value="technical">টেকনিক্যাল সাপোর্ট</SelectItem>
                        <SelectItem value="mental">মানসিক স্বাস্থ্য সহায়তা</SelectItem>
                    </SelectContent>
                </Select>

                {(search || profession || location || skill) && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            router.push(pathname)
                            setSearch("")
                        }}
                    >
                        ফিল্টার রিসেট করুন
                    </Button>
                )}
            </div>
        </div>
    )
}

