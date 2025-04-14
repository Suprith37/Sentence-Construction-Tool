import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  className:string;
  onTimeUp: () => void;
}

export function Timer({ timeRemaining, totalTime, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-[#616464]">
        
        <span>{timeRemaining}s</span>
      </div>
      <Progress value={progress} className="h-2" style={{"backgroundColor":"grey"}}/>
    </div>
  );
}