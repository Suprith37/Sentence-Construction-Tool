export interface QuestionData {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface Question {
  id: string;
  sentence: string;
  words: string[];
  blanks: number;
  correctAnswer: string[];
}

export interface GameState {
  currentQuestion: number;
  score: number;
  answers: {
    [key: number]: string[];
  };
  timeRemaining: number;
}

export interface FeedbackItem {
  question: string;
  userAnswer: string[];
  correctAnswer: string[];
  isCorrect: boolean;
}

export interface APIResponse {
  status: string;
  data: {
    testId: string;
    questions: QuestionData[];
  };
  message: string;
}