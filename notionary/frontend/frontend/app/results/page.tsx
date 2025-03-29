"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowLeft, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      category: "Cell Biology",
    },
    {
      id: "2",
      question: "Explain the process of photosynthesis.",
      userAnswer: "Plants use sunlight to make food from water and carbon dioxide.",
      correctAnswer:
        "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, generating oxygen as a byproduct.",
      isCorrect: true,
      category: "Plant Biology",
    },
    {
      id: "3",
      question: "What is the difference between mitosis and meiosis?",
      userAnswer: "Mitosis makes identical cells and meiosis makes cells for reproduction.",
      correctAnswer:
        "Mitosis is cell division that results in two identical daughter cells, while meiosis is cell division that results in four daughter cells each with half the number of chromosomes.",
      isCorrect: true,
      category: "Cell Biology",
    },
    {
      id: "4",
      question: "Describe the structure of DNA.",
      userAnswer: "DNA is made of nucleotides in a spiral shape.",
      correctAnswer:
        "DNA is a double helix structure made up of nucleotides. Each nucleotide contains a phosphate group, a sugar group, and a nitrogen base (adenine, thymine, guanine, or cytosine).",
      isCorrect: false,
      category: "Molecular Biology",
    },
    {
      id: "5",
      question: "What is natural selection?",
      userAnswer: "When animals evolve to survive better.",
      correctAnswer:
        "Natural selection is the process where organisms better adapted to their environment tend to survive and produce more offspring, driving evolution.",
      isCorrect: false,
      category: "Evolution",
    },
  ],
}

export default function ResultsPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const percentage = Math.round((mockResults.correctAnswers / mockResults.totalQuestions) * 100)

  // Calculate category statistics
  const categoryStats = mockResults.questions.reduce(
    (acc: Record<string, { total: number; correct: number }>, question) => {
      if (!acc[question.category]) {
        acc[question.category] = { total: 0, correct: 0 }
      }
      acc[question.category].total += 1
      if (question.isCorrect) {
        acc[question.category].correct += 1
      }
      return acc
    },
    {},
  )

  const handleSendReport = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setIsSending(true)

    // Simulate API call to send text message
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSentSuccess(true)
      setIsSending(false)
    } catch (error) {
      console.error("Error sending report:", error)
      setIsSending(false)
    }
  }

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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="mb-12 rounded-lg border bg-white p-8 text-center shadow-sm">
                  <h2 className="mb-6 text-2xl font-bold">
                    You answered {mockResults.correctAnswers} out of {mockResults.totalQuestions} correctly!
                  </h2>

                  <div className="relative mx-auto mb-6 h-36 w-36">
                    {/* Dynamic circle that changes with percentage */}
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={percentage >= 70 ? "#10b981" : percentage >= 40 ? "#f59e0b" : "#ef4444"}
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset={282.7 - (282.7 * percentage) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Percentage text */}
                      <text x="50" y="55" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
                        {percentage}%
                      </text>
                    </svg>
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
                            <p className="mt-1 text-xs text-muted-foreground">Category: {question.category}</p>
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
              </TabsContent>

              <TabsContent value="statistics" className="mt-6">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold">Performance by Category</h3>

                  <div className="space-y-6">
                    {Object.entries(categoryStats).map(([category, stats]) => {
                      const categoryPercentage = Math.round((stats.correct / stats.total) * 100)
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category}</span>
                            <span className="text-sm text-muted-foreground">
                              {stats.correct}/{stats.total} ({categoryPercentage}%)
                            </span>
                          </div>
                          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full ${
                                categoryPercentage >= 70
                                  ? "bg-green-500"
                                  : categoryPercentage >= 40
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${categoryPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 text-xl font-bold">Accuracy Breakdown</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border bg-gray-50 p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">{percentage}%</div>
                        <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                      </div>
                      <div className="rounded-lg border bg-gray-50 p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {mockResults.correctAnswers}/{mockResults.totalQuestions}
                        </div>
                        <div className="text-sm text-muted-foreground">Questions Correct</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex gap-4">
                <Link href="/select-notes">
                  <Button variant="outline">Go Back to Notes</Button>
                </Link>
                <Link href="/quiz">
                  <Button>Try Another Quiz</Button>
                </Link>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Send Report to Phone
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Quiz Report</DialogTitle>
                    <DialogDescription>
                      Receive a text message with your quiz results and performance statistics.
                    </DialogDescription>
                  </DialogHeader>

                  {sentSuccess ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">Report Sent!</h3>
                      <p className="text-sm text-muted-foreground">Your quiz report has been sent to {phoneNumber}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={handleSendReport}
                          disabled={isSending || !phoneNumber}
                          className="w-full"
                        >
                          {isSending ? "Sending..." : "Send Report"}
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">© 2024 NotionQuiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

