"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner" // ✅ Sonner import
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerMember } from "@/lib/actions"

const skillOptions = [
    { id: "medical", label: "মেডিকেল সাপোর্ট" },
    { id: "legal", label: "আইনি সহায়তা" },
    { id: "education", label: "শিক্ষা সহায়তা" },
    { id: "career", label: "ক্যারিয়ার গাইডেন্স" },
    { id: "financial", label: "আর্থিক সহায়তা" },
    { id: "technical", label: "টেকনিক্যাল সাপোর্ট" },
    { id: "mental", label: "মানসিক স্বাস্থ্য সহায়তা" },
    { id: "other", label: "অন্যান্য" },
]

const formSchema = z.object({
    name: z.string().min(2, { message: "নাম অবশ্যই ২ অক্ষরের বেশি হতে হবে" }),
    profession: z.string().min(2, { message: "প্রফেশন অবশ্যই উল্লেখ করতে হবে" }),
    permanentAddress: z.string().min(5, { message: "পার্মানেন্ট ঠিকানা অবশ্যই উল্লেখ করতে হবে" }),
    currentAddress: z.string().min(5, { message: "বর্তমান ঠিকানা অবশ্যই উল্লেখ করতে হবে" }),
    skills: z.array(z.string()).refine((value) => value.length > 0, { message: "অন্তত একটি স্কিল সিলেক্ট করুন" }),
    phone: z.string().min(11, { message: "সঠিক মোবাইল নম্বর দিন" }),
    email: z.string().email({ message: "সঠিক ইমেইল দিন" }).optional().or(z.literal("")),
    facebookProfile: z.string().url({ message: "সঠিক ফেসবুক প্রোফাইল লিংক দিন" }).optional().or(z.literal("")),
    secretCode: z.string().min(1, { message: "সিক্রেট কোড অবশ্যই দিতে হবে" }),
    password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
})

export default function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            profession: "",
            permanentAddress: "",
            currentAddress: "",
            skills: [],
            phone: "",
            email: "",
            facebookProfile: "",
            secretCode: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            await registerMember(values)
            toast.success("রেজিস্ট্রেশন সফল হয়েছে!", {
                description: "আপনি সফলভাবে কমিউনিটিতে যোগ দিয়েছেন।"
            })
            router.push("/")
        } catch (error) {
            console.error(error)
            toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে", {
                description: error instanceof Error ? error.message : "একটি সমস্যা হয়েছে, আবার চেষ্টা করুন"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>নাম</FormLabel>
                            <FormControl>
                                <Input placeholder="আপনার পূর্ণ নাম" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>প্রফেশন</FormLabel>
                            <FormControl>
                                <Input placeholder="আপনার পেশা" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="permanentAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>পার্মানেন্ট ঠিকানা</FormLabel>
                            <FormControl>
                                <Input placeholder="আপনার স্থায়ী ঠিকানা" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="currentAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>বর্তমান ঠিকানা</FormLabel>
                            <FormControl>
                                <Input placeholder="আপনার বর্তমান ঠিকানা" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel>কি কি হেল্প করতে পারবেন</FormLabel>
                                <FormDescription>আপনি যে ধরনের সাহায্য করতে পারবেন তা নির্বাচন করুন</FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {skillOptions.map((option) => (
                                    <FormField
                                        key={option.id}
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(option.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, option.id])
                                                                : field.onChange(field.value?.filter((value) => value !== option.id))
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">{option.label}</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>মোবাইল নম্বর</FormLabel>
                            <FormControl>
                                <Input placeholder="01XXXXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ইমেইল (ঐচ্ছিক)</FormLabel>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="facebookProfile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ফেসবুক প্রোফাইল লিংক (ঐচ্ছিক)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://facebook.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Card className="p-4 bg-muted">
                    <FormField
                        control={form.control}
                        name="secretCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>সিক্রেট কোড</FormLabel>
                                <FormDescription>কমিউনিটি অ্যাডমিন দ্বারা প্রদত্ত সিক্রেট কোড দিন</FormDescription>
                                <FormControl>
                                    <Input placeholder="সিক্রেট কোড" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Card>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>পাসওয়ার্ড</FormLabel>
                            <FormDescription>ভবিষ্যতে লগইন করার জন্য একটি পাসওয়ার্ড সেট করুন</FormDescription>
                            <FormControl>
                                <Input type="password" placeholder="পাসওয়ার্ড" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "প্রসেসিং..." : "রেজিস্ট্রেশন করুন"}
                </Button>
            </form>
        </Form>
    )
}
