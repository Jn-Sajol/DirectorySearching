import { PhoneCall } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Member } from "@/lib/types"

export default function MemberCard({ member }: { member: Member }) {
    return (
        <Card>
            <CardHeader>
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.profession}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-sm font-medium">বর্তমান ঠিকানা:</p>
                    <p className="text-sm text-muted-foreground">{member.currentAddress}</p>
                </div>
                <div>
                    <p className="text-sm font-medium">পার্মানেন্ট ঠিকানা:</p>
                    <p className="text-sm text-muted-foreground">{member.permanentAddress}</p>
                </div>
                <div className="pt-2">
                    <p className="text-sm font-medium mb-2">সাহায্য করতে পারবেন:</p>
                    <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                                {getSkillLabel(skill)}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <a href={`tel:${member.phone}`}>
                        <PhoneCall className="mr-2 h-4 w-4" />
                        যোগাযোগ করুন
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}

function getSkillLabel(skillId: string): string {
    const skillMap: Record<string, string> = {
        medical: "মেডিকেল সাপোর্ট",
        legal: "আইনি সহায়তা",
        education: "শিক্ষা সহায়তা",
        career: "ক্যারিয়ার গাইডেন্স",
        financial: "আর্থিক সহায়তা",
        technical: "টেকনিক্যাল সাপোর্ট",
        mental: "মানসিক স্বাস্থ্য সহায়তা",
        other: "অন্যান্য",
    }

    return skillMap[skillId] || skillId
}

