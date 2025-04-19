import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegistrationForm from "@/components/registration-form"

export default function RegisterPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">রেজিস্ট্রেশন ফরম</CardTitle>
                    <CardDescription>কমিউনিটিতে যোগ দিতে নিচের ফরমটি পূরণ করুন</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegistrationForm />
                </CardContent>
            </Card>
        </div>
    )
}

