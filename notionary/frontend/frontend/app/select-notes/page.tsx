"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Mock Notion pages data
const mockNotionPages = [
  {
    id: "1",
    title: "Microeconomics",
    description: "Choices under scarcity; individuals maximize utility, firms maximize profit.",
    lastEdited: "Today",
  },
  {
    id: "2",
    title: "Chemistry",
    description: "Matter and energy interactions; atoms, molecules, reactions, and periodic trends.",
    lastEdited: "Today",
  },
  {
    id: "3",
    title: "Data Structures and Algorithms",
    description: "Organizing data efficiently; arrays, trees, graphs, sorting, searching algorithms.",
    lastEdited: "Today",
  },
  {
    id: "4",
    title: "American History",
    description: "Colonization, revolution, expansion, civil war, rights movements, global influence.",
    lastEdited: "Today",
  },
  {
    id: "5",
    title: "Literature Notes",
    description: "Analysis of classic novels and literary techniques.",
    lastEdited: "Today",
  },
  {
    id: "6",
    title: "Mathematics",
    description: "Algebra, calculus, and statistical methods.",
    lastEdited: "Today",
  },
]

export default function SelectNotesPage() {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])

  const toggleNote = (id: string) => {
    setSelectedNotes((prev) => (prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/select-notes" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-black"></div>
            <span className="text-xl font-medium">Notionary</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center">
              <Link href="/">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Choose Notes for Your Quiz</h1>
            </div>

            <div className="mb-6 rounded-lg border bg-primary/5 p-4">
              <p className="text-sm">
                Select the Notion pages you want to include in your quiz. We'll generate questions based on the content
                of these pages.
              </p>
            </div>

            <div className="space-y-4">
              {mockNotionPages.map((page) => (
                <div
                  key={page.id}
                  className={`rounded-lg border p-4 transition-all hover:shadow-md ${
                    selectedNotes.includes(page.id) ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <Checkbox
                      id={`note-${page.id}`}
                      checked={selectedNotes.includes(page.id)}
                      onCheckedChange={() => toggleNote(page.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <label htmlFor={`note-${page.id}`} className="block cursor-pointer text-lg font-medium">
                        {page.title}
                      </label>
                      <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">Last edited: {page.lastEdited}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                href={selectedNotes.length > 0 ? "/quiz" : "#"}
                className={selectedNotes.length === 0 ? "pointer-events-none opacity-50" : ""}
              >
                <Button size="lg" className="gap-2" disabled={selectedNotes.length === 0}>
                  Generate Quiz <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">© 2024 Notionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

