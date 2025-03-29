"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, ArrowLeft, Volume2, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { apiService, type Question } from "@/lib/api"

// Define SpeechRecognition type
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [answers, setAnswers] = useState<{ [key: string]: any }>({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [inputMode, setInputMode] = useState<"voice" | "text">("text")
  const [isLoading, setIsLoading] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await apiService.getQuestions()
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / questions.length) * 100

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setTranscript(transcript)

        if (currentQuestion.type === "short_answer") {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: transcript }))
        } else if (currentQuestion.type === "mcq") {
          // Try to match the spoken answer to an option
          const optionIndex = findMatchingOptionIndex(transcript)
          if (optionIndex !== -1) {
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }))
          }
        }

        stopListening()
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        stopListening()
      }
    }

    return () => {
      if (recognitionRef.current) {
        stopListening()
      }
    }
  }, [currentQuestionIndex, currentQuestion])

  const findMatchingOptionIndex = (transcript: string) => {
    if (currentQuestion.type !== "mcq") return -1

    const options = currentQuestion.options
    const transcriptLower = transcript.toLowerCase()

    // First try to find an exact match with option number
    const numberMatch = transcriptLower.match(/option (\d+)|number (\d+)|(\d+)/)
    if (numberMatch) {
      const num = Number.parseInt(numberMatch[1] || numberMatch[2] || numberMatch[3])
      if (num >= 1 && num <= options.length) {
        return num - 1
      }
    }

    // Then try to find the option text in the transcript
    for (let i = 0; i < options.length; i++) {
      if (transcriptLower.includes(options[i].toLowerCase())) {
        return i
      }
    }

    return -1
  }

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setTranscript("")
        setInputMode("voice")
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        setIsListening(false)
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowAnswer(false)
        setIsTransitioning(false)
        setInputMode("text")
        setTranscript("")
      }, 300)
    } else {
      handleSubmit()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setShowAnswer(false)
        setIsTransitioning(false)
        setInputMode("text")
        setTranscript("")
      }, 300)
    }
  }

  const speakQuestion = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleMCQChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: Number.parseInt(value) })
  }

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const result = await apiService.submitAnswers(answers)
      // Redirect to results page with the quiz ID
      window.location.href = `/results?quizId=${result.quizId}`
    } catch (error) {
      console.error('Error submitting answers:', error)
    }
  }

  const renderMCQQuestion = () => {
    const selectedOption = answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id] : null
    const isCorrect = showAnswer && selectedOption === currentQuestion.correctAnswer
    const isIncorrect = showAnswer && selectedOption !== null && selectedOption !== currentQuestion.correctAnswer

    return (
      <div className="space-y-4">
        {showAnswer && (
          <div className="rounded-lg bg-primary/5 p-4 mb-4">
            <h3 className="mb-2 font-medium">Correct Answer:</h3>
            <p>{currentQuestion.options[currentQuestion.correctAnswer]}</p>
          </div>
        )}

        <RadioGroup
          value={selectedOption !== null ? selectedOption.toString() : undefined}
          onValueChange={handleMCQChange}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 rounded-md border p-3 ${
                showAnswer && index === currentQuestion.correctAnswer
                  ? "border-green-500 bg-green-50"
                  : isIncorrect && selectedOption === index
                    ? "border-red-500 bg-red-50"
                    : ""
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
                {showAnswer && index === currentQuestion.correctAnswer && (
                  <Check className="inline-block ml-2 h-4 w-4 text-green-600" />
                )}
                {isIncorrect && selectedOption === index && <X className="inline-block ml-2 h-4 w-4 text-red-600" />}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {inputMode === "voice" && transcript && (
          <div className="mt-4 p-3 border rounded-md bg-gray-50">
            <p className="text-sm font-medium">Transcript:</p>
            <p className="text-sm">{transcript}</p>
          </div>
        )}
      </div>
    )
  }

  const renderShortAnswerQuestion = () => {
    const userAnswer = answers[currentQuestion.id] || ""

    return (
      <div className="space-y-4">
        {showAnswer && (
          <div className="rounded-lg bg-primary/5 p-4 mb-4">
            <h3 className="mb-2 font-medium">Correct Answer:</h3>
            <p>{currentQuestion.correctAnswer}</p>
          </div>
        )}

        {inputMode === "text" ? (
          <div className="space-y-2">
            <Label htmlFor="short-answer">Your Answer:</Label>
            <Input
              id="short-answer"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={handleShortAnswerChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <Button
              size="lg"
              className={`mb-4 h-16 w-16 rounded-full ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <p className="text-center text-muted-foreground">
              {isListening ? "Listening..." : "Click the microphone and speak your answer"}
            </p>
            {transcript && (
              <div className="mt-4 p-3 border rounded-md bg-gray-50 w-full">
                <p className="text-sm font-medium">Transcript:</p>
                <p className="text-sm">{transcript}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Loading questions...</div>
          <Progress value={33} className="w-[200px]" />
        </div>
      </div>
    )
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
            <div className="mb-8 flex items-center justify-between">
              <Link href="/select-notes">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <Progress value={progress} className="mb-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg border bg-white p-6 shadow-sm ${isTransitioning ? "opacity-0" : ""}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
                  <Button variant="ghost" size="icon" onClick={speakQuestion} title="Listen to question">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>

                {currentQuestion.type === "mcq" ? renderMCQQuestion() : renderShortAnswerQuestion()}

                <div className="mt-8 flex justify-between items-center">
                  <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {currentQuestion.type === "short_answer" && (
                      <Button
                        variant="outline"
                        onClick={() => setInputMode(inputMode === "text" ? "voice" : "text")}
                        className="gap-2"
                      >
                        {inputMode === "text" ? (
                          <>
                            <Mic className="h-4 w-4" /> Use Voice
                          </>
                        ) : (
                          <>
                            <Input className="h-4 w-4" /> Use Text
                          </>
                        )}
                      </Button>
                    )}

                    {!showAnswer && (
                      <Button variant="outline" onClick={() => setShowAnswer(true)}>
                        Show Answer
                      </Button>
                    )}

                    <Button onClick={handleNextQuestion}>
                      {currentQuestionIndex < questions.length - 1 ? "Next" : "See Results"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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

