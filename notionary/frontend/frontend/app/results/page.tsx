"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowLeft } from "lucide-react"

export default function ResultsPage() {
  const [results, setResults] = useState<null | {
    totalQuestions: number
    correctAnswers: number
    questions: {
      id: string
      question: string
      userAnswer: string
      correctAnswer: string
      isCorrect: boolean
    }[]
  }>(null)

  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("quizResults")
    if (stored) {
      setResults(JSON.parse(stored))
    }
  }, [])

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  if (!results) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg">No results found.</p>
      </main>
    )
  }

  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100)

  // Calculate the circle properties
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Determine color based on percentage
  const getColorClass = (percent: number) => {
    if (percent >= 80) return "stroke-green-500"
    if (percent >= 60) return "stroke-blue-500"
    if (percent >= 40) return "stroke-yellow-500"
    return "stroke-red-500"
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
                You answered {results.correctAnswers} out of {results.totalQuestions} correctly!
              </h2>

              <div className="mx-auto mb-6 relative flex h-36 w-36 items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 150 150">
                  {/* Background circle */}
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    className="stroke-primary/20"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    className={getColorClass(percentage)}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold">{percentage}%</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Correct: {results.correctAnswers}</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-muted-foreground">
                    Incorrect: {results.totalQuestions - results.correctAnswers}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">Question Details</h3>

            <div className="space-y-4">
              {results.questions.map((question) => (
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
                        <p className="text-sm">{question.userAnswer || "No answer provided"}</p>
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
            <p className="text-center text-sm text-muted-foreground">© 2024 Notionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

