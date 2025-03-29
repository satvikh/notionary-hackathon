import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Question {
  id: string;
  type: 'mcq' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  questions: {
    id: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

export const apiService = {
  // Get quiz questions
  getQuestions: async (): Promise<Question[]> => {
    const response = await api.get('/api/questions');
    return response.data;
  },

  // Submit quiz answers
  submitAnswers: async (answers: Record<string, any>): Promise<QuizResult> => {
    const response = await api.post('/api/submit', answers);
    return response.data;
  },

  // Get quiz results
  getResults: async (quizId: string): Promise<QuizResult> => {
    const response = await api.get(`/api/results/${quizId}`);
    return response.data;
  },
}; 