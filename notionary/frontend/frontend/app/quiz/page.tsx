"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        console.log("Fetching quiz..."); // ✅ Check if this is logged
        const response = await fetch("http://localhost:3001/api/quiz");
        const data = await response.json();
        
        console.log("API Response:", data); // ✅ Check the API output
        console.log("data.quiz:", data.quiz); // ✅ Check quiz specifically
  
        setQuizQuestions(data.quiz || []); // Double-check if it's in the expected format
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };
  
    if (quizQuestions.length === 0) {
      fetchQuiz();
    }
  }, []); // ✅ Correct dependency array
  
  if (loading) {
    return <p className="text-center">Loading questions...</p>;
  }

  if (quizQuestions.length === 0) {
    return <p className="text-center">No questions found.</p>;
  }
  console.log("Quiz Questions State:", quizQuestions);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/select-notes">
                <Button variant="ghost" size="icon">
                  <span>←</span>
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>

            <Progress value={progress} className="mb-8" />

            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>

              {/* Render multiple-choice or short answer */}
              {currentQuestion.type === "mcq" ? (
                <div>
                  {currentQuestion.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 rounded-md border p-3">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name={`question-${currentQuestion.id}`}
                        value={index}
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <Input placeholder="Type your answer here..." />
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
