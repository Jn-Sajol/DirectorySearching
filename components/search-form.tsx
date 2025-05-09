"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFormProps {
  initialSearch?: string
  initialProfession?: string
}

export default function SearchForm({ initialSearch = "", initialProfession = "" }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialSearch)
  const [profession, setProfession] = useState(initialProfession)
  const [professions, setProfessions] = useState<string[]>([])

  useEffect(() => {
    // Fetch unique professions for the dropdown
    async function fetchProfessions() {
      try {
        const response = await fetch("/api/professions")
        const data = await response.json()
        setProfessions(data.professions)
      } catch (error) {
        console.error("Error fetching professions:", error)
      }
    }

    fetchProfessions()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (profession) params.set("profession", profession)

    router.push(`/?${params.toString()}`)
  }

  const handleReset = () => {
    setSearch("")
    setProfession("")
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />

      <Select value={profession} onValueChange={setProfession}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by profession" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Professions</SelectItem>
          {professions.map((prof) => (
            <SelectItem key={prof} value={prof}>
              {prof}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  )
}
