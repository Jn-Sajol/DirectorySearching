import type React from "react"
import { Inter, Noto_Sans_Bengali } from "next/font/google"
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
})

export const metadata = {
  title: "কমিউনিটি মেম্বার ডিরেক্টরি",
  description: "A community-driven web application for members to connect",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${bengali.variable} font-bengali`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

