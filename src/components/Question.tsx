import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Timer } from './Timer';
import { Question as QuestionType } from '@/types';



interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  correctAnswers: string[];
  onTimeUp: () => void;
  onAnswer: (answer: string[]) => void;
}

export function Question({ 
  question, 
  questionNumber,
  totalQuestions,
  timeRemaining, 
  onTimeUp, 
  onAnswer 
}: QuestionProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>(Array(question.blanks).fill(''));
  const [availableWords, setAvailableWords] = useState<string[]>(question.words);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedWords(Array(question.blanks).fill(''));
    setAvailableWords(question.words);
    setHasAnswered(false);
  }, [question]);

  const handleWordSelect = (word: string) => {
    if (hasAnswered) return; // Prevent changes after answering
    
    const firstEmptyIndex = selectedWords.findIndex(w => w === '');
    if (firstEmptyIndex !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[firstEmptyIndex] = word;
      setSelectedWords(newSelectedWords);
      setAvailableWords(availableWords.filter(w => w !== word));

      // If all blanks are filled, submit the answer
      if (newSelectedWords.every(w => w !== '')) {
        setHasAnswered(true);
        onAnswer(newSelectedWords);
      }
    }
  };

  const handleBlankClick = (index: number) => {
    if (hasAnswered) return; // Prevent changes after answering
    
    if (selectedWords[index] !== '') {
      setAvailableWords([...availableWords, selectedWords[index]]);
      const newSelectedWords = [...selectedWords];
      newSelectedWords[index] = '';
      setSelectedWords(newSelectedWords);
    }
  };

  const renderSentence = () => {
    const parts = question.sentence.split('_____________');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <button
            onClick={() => handleBlankClick(index)}
            className={`mx-2 my-1 px-4 py-1 rounded ${
              selectedWords[index]
                ? "text-[#414343] border-2 rounded-lg border-color-[#BFC6C6] "
                : 'bg-transparent min-w-[80px]'
            }`}
            disabled={hasAnswered}
          >
            {selectedWords[index] || '______'}
          </button>
        )}
      </span>
    ));
  };


  return (

    <Card className="sec_container pt-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col font-[Poppins] text 
     bg-[rgba(255,255,255,0.6)] rounded-3xl shadow-[0_2px_36px_0_rgba(0,0,0,0.08)] backdrop-blur-[50px]">
      <CardHeader className="space-y-4">
        <div className="flex justify-betweeen items-center">
          <div className="text-md text-blue-800 foreground relative mx-auto left-7">
            Question {questionNumber} of {totalQuestions}
          </div>
          <Button style={{"color":"black", "borderColor":"#BFC6C6"}} variant="outline" onClick={() => window.location.href = 'http://localhost:5173/'} >
              Quit
            </Button>
           
        </div>
        
        <Timer className='text-[#616464]' timeRemaining={timeRemaining} totalTime={30} onTimeUp={onTimeUp} />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center font-medium text-lg">
          Select the missing words in the correct order
        </div>
        
        <div className="text-md text-[#2A2D2D] relative bottom-3 pl-2">
          {renderSentence()}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {availableWords.map((word, index) => (
            <Button
              style={{"color":"#414343", "borderColor":"#BFC6C6"}}
              key={index}
              variant="outline"
              onClick={() => handleWordSelect(word)}
              className='border rounded-lg'
              disabled={hasAnswered}
            >
              {word}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}