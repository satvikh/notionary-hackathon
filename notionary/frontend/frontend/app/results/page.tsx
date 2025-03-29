"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowLeft } from "lucide-react"
import { apiService, type QuizResult } from "@/lib/api"

export default function ResultsPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])
  const [results, setResults] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get quizId from URL query parameters
        const params = new URLSearchParams(window.location.search)
        const quizId = params.get('quizId')
        
        if (!quizId) {
          console.error('No quiz ID provided')
          return
        }

        const fetchedResults = await apiService.getResults(quizId)
        setResults(fetchedResults)
      } catch (error) {
        console.error('Error fetching results:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Loading results...</div>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">No results found</div>
          <Link href="/quiz">
            <Button>Back to Quiz</Button>
          </Link>
        </div>
      </div>
    )
  }

  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/select-notes" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-black"></div>
            <span className="text-xl font-medium">NotionQuiz</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Quiz Results</h1>
            <p className="text-lg text-muted-foreground">
              You scored {percentage}% ({results.correctAnswers} out of {results.totalQuestions} correct)
            </p>
          </div>

          <div className="space-y-4">
            {results.questions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  {question.isCorrect ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-medium">Your answer:</span>{" "}
                    {question.userAnswer}
                  </div>
                  <div>
                    <span className="font-medium">Correct answer:</span>{" "}
                    {question.correctAnswer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

