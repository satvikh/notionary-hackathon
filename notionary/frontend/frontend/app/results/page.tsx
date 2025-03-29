"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowLeft } from "lucide-react"

// Mock quiz results data
const mockResults = {
  totalQuestions: 5,
  correctAnswers: 3,
  questions: [
    {
      id: "1",
      question: "What are the main components of a cell?",
      userAnswer: "Cell membrane, cytoplasm, nucleus, mitochondria, and ribosomes.",
      correctAnswer:
        "The main components of a cell include the cell membrane, cytoplasm, nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, and lysosomes.",
      isCorrect: true,
    },
    {
      id: "2",
      question: "Explain the process of photosynthesis.",
      userAnswer: "Plants use sunlight to make food from water and carbon dioxide.",
      correctAnswer:
        "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, generating oxygen as a byproduct.",
      isCorrect: true,
    },
    {
      id: "3",
      question: "What is the difference between mitosis and meiosis?",
      userAnswer: "Mitosis makes identical cells and meiosis makes cells for reproduction.",
      correctAnswer:
        "Mitosis is cell division that results in two identical daughter cells, while meiosis is cell division that results in four daughter cells each with half the number of chromosomes.",
      isCorrect: true,
    },
    {
      id: "4",
      question: "Describe the structure of DNA.",
      userAnswer: "DNA is made of nucleotides in a spiral shape.",
      correctAnswer:
        "DNA is a double helix structure made up of nucleotides. Each nucleotide contains a phosphate group, a sugar group, and a nitrogen base (adenine, thymine, guanine, or cytosine).",
      isCorrect: false,
    },
    {
      id: "5",
      question: "What is natural selection?",
      userAnswer: "When animals evolve to survive better.",
      correctAnswer:
        "Natural selection is the process where organisms better adapted to their environment tend to survive and produce more offspring, driving evolution.",
      isCorrect: false,
    },
  ],
}

export default function ResultsPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const percentage = Math.round((mockResults.correctAnswers / mockResults.totalQuestions) * 100)

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
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center">
              <Link href="/quiz">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Quiz Results</h1>
            </div>

            <div className="mb-12 rounded-lg border bg-white p-8 text-center shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">
                You answered {mockResults.correctAnswers} out of {mockResults.totalQuestions} correctly!
              </h2>

              <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border-8 border-primary/20">
                <div className="text-4xl font-bold">{percentage}%</div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Correct: {mockResults.correctAnswers}</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-muted-foreground">
                    Incorrect: {mockResults.totalQuestions - mockResults.correctAnswers}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">Question Details</h3>

            <div className="space-y-4">
              {mockResults.questions.map((question) => (
                <div
                  key={question.id}
                  className={`rounded-lg border bg-white shadow-sm transition-all ${
                    question.isCorrect ? "border-green-200" : "border-red-200"
                  }`}
                >
                  <div
                    className={`flex cursor-pointer items-start justify-between p-4 ${
                      question.isCorrect ? "bg-green-50" : "bg-red-50"
                    }`}
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          question.isCorrect ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {question.isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{question.question}</h4>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {expandedQuestions.includes(question.id) ? "Hide" : "Show"} Details
                    </div>
                  </div>

                  {expandedQuestions.includes(question.id) && (
                    <div className="border-t p-4">
                      <div className="mb-4">
                        <h5 className="mb-1 text-sm font-medium">Your Answer:</h5>
                        <p className="text-sm">{question.userAnswer}</p>
                      </div>
                      <div>
                        <h5 className="mb-1 text-sm font-medium">Correct Answer:</h5>
                        <p className="text-sm">{question.correctAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Link href="/select-notes">
                <Button variant="outline">Go Back to Notes</Button>
              </Link>
              <Link href="/quiz">
                <Button>Try Another Quiz</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">Â© 2024 Notionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}