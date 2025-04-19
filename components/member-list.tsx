import { Suspense } from "react"
import MemberCard from "@/components/member-card"
import MemberFilter from "@/components/member-filter"
import { filterMembers } from "@/lib/data"

export default async function MemberList() {
    const members = await filterMembers()
    console.log('filter memeber', members)

    return (
        <div className="space-y-6">
            <Suspense>
                <MemberFilter />
            </Suspense>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.length > 0 ? (
                    members.map((member) => <MemberCard key={member.id} member={member} />)
                ) : (
                    <div className="col-span-full text-center py-12">
                        <h3 className="text-xl font-semibold">কোন সদস্য পাওয়া যায়নি</h3>
                        <p className="text-muted-foreground mt-2">অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা পরে আবার চেষ্টা করুন</p>
                    </div>
                )}
            </div>
        </div>
    )
}

