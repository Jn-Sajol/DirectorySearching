import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { PhoneIcon, MailIcon, MapPinIcon, BriefcaseIcon, HomeIcon, ArrowLeftIcon, PencilIcon } from "lucide-react"

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Directory</span>
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex justify-between  items-center">
              <CardTitle className="text-3xl">{user.fullName}</CardTitle>
</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="text-sm">{user.profession}</Badge>
              </div>
            
            {/* <div className="flex gap-2">
              <Link href={`/profile/${user.id}/edit`}>
                <Button className="flex items-center gap-2">
                  <PencilIcon className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <a href={`tel:${user.phoneNumber}`} className="hover:underline">
                    {user.phoneNumber}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BriefcaseIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{user.jobLocation}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Addresses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Present Address</span>
                </div>
                <p className="pl-6">{user.presentAddress}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Permanent Address</span>
                </div>
                <p className="pl-6">{user.permanentAddress}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">How I Can Help</h3>
            <p>{user.helpDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
