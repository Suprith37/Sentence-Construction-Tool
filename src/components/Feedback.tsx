import { Button } from '@/components/ui/button';
import { Card, CardContent, } from '@/components/ui/card';
import { FeedbackItem } from '@/types';
import './feedback.css';
import { useEffect, useState, useRef } from 'react';
import { Header } from './Header'

interface FeedbackProps {
  feedback: FeedbackItem[];       // Array of feedback items for each question
  score: number;                 // User's total score
  correctAnswers: string[][];    // Correct answers for all questions
  userAnswers: string[][];       // User's answers for all questions
  onRestart: () => void;         // Callback to restart the game
}

// Helper function to complete sentences with user/correct answers
function completeSentence(sentence: string, answers: string[]): string {
  const parts = sentence.split('_____________');
  return parts.reduce((acc, part, index) => {
    return acc + part + (index < answers.length ? answers[index] : '');
  }, '');
}

export function Feedback({ feedback, score, userAnswers, onRestart }: FeedbackProps) {
  const [scr, setScore] = useState(0);              // Animated score state
  const progressCircleRef = useRef<SVGCircleElement>(null); // Ref for progress circle
  
  const total = feedback.length;                   // Total number of questions
  const percentage = Math.round((score / total) * 100); // Score percentage
  const targetScore = percentage;                  // Target for score animation

  // Determine feedback message and color based on performance
  let feedbackMessage = '';
  let strokeColor = '';

  // Score animation effect
  useEffect(() => {
    let currentScore = 0;
    const circumference = 314; // Circle circumference for stroke calculation

    // Set initial stroke color based on performance
    if (progressCircleRef.current) {
      if (targetScore <= 50) {
        progressCircleRef.current.style.stroke = '#f56565'; // Red
      } else if (targetScore <= 80) {
        progressCircleRef.current.style.stroke = '#ecc94b'; // Yellow
      } else {
        progressCircleRef.current.style.stroke = '#48bb78'; // Green
      }
    }

    // Animate score counting up and progress circle
    const interval = setInterval(() => {
      if (currentScore < targetScore) {
        currentScore++;
        setScore(currentScore);
        if (progressCircleRef.current) {
          const currentOffset = circumference - (currentScore / 100) * circumference;
          progressCircleRef.current.style.strokeDashoffset = currentOffset.toString();
        }
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetScore]);

  // Set feedback message based on performance
  if (percentage <= 50) {
    strokeColor = '#f56565';
    feedbackMessage = `Your current score suggests there's still considerable opportunity for growth in your sentence construction skills. We recommend focusing on mastering fundamental grammar concepts, particularly proper word order and sentence structure, as these form the foundation for clear communication`;
  } else if (percentage <= 80) {
    strokeColor = '#ecc94b';
    feedbackMessage = `Your score shows a good understanding, but there’s still room to grow. Take time to review the tricky parts and keep practicing to sharpen your sentence construction skills.`;
  } else {
    strokeColor = '#48bb78';
    feedbackMessage = `"Excellent work! You’ve demonstrated a strong grasp of sentence construction. Keep building on this foundation by practicing regularly and exploring more complex sentence patterns.`;
  }

  return (
    <div className='main_box w-full flex flex-col p-10'>
      {/* Header component */}
      <Header />

      {/* Main feedback card */}
      <Card className="shadow-transparent border border-transparent text-card-foreground w-full mx-auto feedback bg-transparent">
        <CardContent className="space-y-8">
          {/* Score display section */}
          <div className="text-center my-4">
            <div className="relative inline-block">
              {/* Animated progress circle */}
              <svg className="w-32 h-32">
                <circle 
                  ref={progressCircleRef}
                  strokeWidth="4" 
                  strokeDasharray="314" 
                  strokeDashoffset="314" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  r="50" 
                  cx="60" 
                  cy="60" 
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              {/* Display animated score */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-semibold relative bottom-3 right-0.2">{scr}</span>
              </div>
              <h6 className='text-md text-lg mt-2>Overall Score'>Overall score</h6>
            </div>

            {/* Feedback message and restart button */}
            <div className="flex flex-col gap-5 mt-4 text-gray-700 relative top-[20px]"
              style={{
                width: "min(80%, 600px)",
                margin: "0 auto",
                textAlign: "center",
                lineHeight: "1.6",
                wordWrap: "break-word"
              }}
            >
              <p className="font-[Poppins]">{feedbackMessage}</p>
              <Button className="mt-4 w-44 mx-auto" onClick={onRestart}>
                Home
              </Button>
            </div>
          </div>

          {/* Detailed feedback for each question */}
          <div className="answers_container flex flex-col gap-12 relative top-10">
            {feedback.map((item, index) => (
              <div key={index} className="main-container flex w-[700px] pt-[16px] font-[Poppins] pr-0 pb-0 pl-0 flex-col gap-[24px] items-start flex-nowrap bg-[#fff] rounded-[16px] relative shadow-[0_2px_36px_0_rgba(0,0,0,0.08)] backdrop-blur-[50px] mx-auto my-0">
                {/* Question prompt */}
                <div className="flex pt-0 pr-[16px] pb-0 pl-[16px] flex-col gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative">
                  <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[1] shadow-[0_4px_70px_0_rgba(66,169,76,0.1)]">
                    <div className="flex w-[57px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[2px] items-center shrink-0 flex-nowrap bg-[#f0f0f0] rounded-[8px] relative z-[2]">
                      <span className="h-[20px] shrink-0 basis-auto text-[14px] font-medium leading-[20px] text-[#606363] tracking-[-0.14px] relative text-left whitespace-nowrap z-[3]">
                        Prompt
                      </span>
                    </div>
                    <div className="w-[27px] shrink-0 s text-[14px] font-medium leading-[20px] tracking-[-0.14px] relative text-left whitespace-nowrap z-[4]">
                      <span className="s text-[14px] font-medium leading-[20px] text-[#404242] tracking-[-0.14px] relative text-left">
                        {index + 1}
                      </span>
                      <span className="s text-[14px] font-normal leading-[20px] text-[#7c8080] tracking-[-0.14px] relative text-left">
                        /{total}
                      </span>
                    </div>
                  </div>

                  {/* User's answer displayed in the sentence */}
                  <div className="flex pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[5]">
                    <span className="grow shrink basis-auto text-[14px] font-normal leading-[20px] text-[#404242] tracking-[-0.16px] relative text-left whitespace-normal z-[6]">
                      {completeSentence(item.question, userAnswers[index])}
                    </span>
                  </div>
                </div>

                {/* Feedback section (correct/incorrect) */}
                <div className="flex pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[12px] justify-center items-start self-stretch shrink-0 flex-nowrap bg-[#f5f8f8] rounded-tl-none rounded-tr-none rounded-br-[16px] rounded-bl-[16px] relative z-[7]">
                  <div className="flex w-[181px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative z-[8]">
                    <span className="h-[22px] shrink-0 basis-auto s text-[16px] font-medium leading-[22px] text-[#606363] tracking-[-0.16px] relative text-left whitespace-nowrap z-[9]">
                      Your response
                    </span>
                    <div className="flex w-[65px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#eefbef] rounded-[16px] relative z-10">
                      <span className={`h-[22px] shrink-0 basis-auto s text-[16px] font-medium leading-[22px] tracking-[-0.16px] relative text-left whitespace-nowrap`}>
                        {item.isCorrect ? (
                          <span className="text-green-500">Correct</span>
                        ) : (
                          <span className="text-red-500">Incorrect</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Correct answer (shown for both correct/incorrect) */}
                  <span className="grow shrink basis-auto text-[14px] font-normal leading-[20px] text-[#404242] tracking-[-0.16px] relative text-left whitespace-normal z-[6]">
                    {completeSentence(item.question, item.correctAnswer)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}