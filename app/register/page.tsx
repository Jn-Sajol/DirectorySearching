"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    presentAddress: "",
    permanentAddress: "",
    jobLocation: "",
    profession: "",
    helpDescription: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (secretKey !== "786") {
      toast("The secret key you entered is incorrect.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.user?.id) {
        localStorage.setItem("currentUserId", data.user.id);
      }

      toast("Your profile has been created successfully.");

      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Register with Jashore Foundation
          </CardTitle>
          <CardDescription>
            Create your profile to connect with other community members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="presentAddress">Present Address</Label>
                <Textarea
                  id="presentAddress"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="jobLocation">Workplace and Job Location</Label>
                <Input
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="helpDescription">
                  How you can help (short description)
                </Label>
                <Textarea
                  id="helpDescription"
                  name="helpDescription"
                  value={formData.helpDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="secretKey">Secret Key</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
