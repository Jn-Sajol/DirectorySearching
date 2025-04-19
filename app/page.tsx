import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MemberList from "@/components/member-list"
import MemberListSkeleton from "@/components/member-list-skeleton"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">কমিউনিটি মেম্বার ডিরেক্টরি</CardTitle>
          <CardDescription>আমাদের কমিউনিটির সদস্যদের খুঁজুন এবং যোগাযোগ করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-muted-foreground">
              মোট সদস্য: <span className="font-semibold">১০০০+</span>
            </p>
            <Link href="/register">
              <Button>রেজিস্ট্রেশন করুন</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<MemberListSkeleton />}>
        <MemberList />
      </Suspense>
    </div>
  )
}

