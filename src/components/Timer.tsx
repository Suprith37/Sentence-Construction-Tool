// Import necessary hooks and components
import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

// Define the props interface for the Timer component
interface TimerProps {
  timeRemaining: number;   // Current remaining time in seconds
  totalTime: number;       // Total initial time in seconds
  className: string;       // CSS classes for styling
  onTimeUp: () => void;    // Callback function when timer reaches zero
}

// Timer component that displays a countdown progress bar
export function Timer({ timeRemaining, totalTime, onTimeUp }: TimerProps) {
  // Effect hook to check when timer reaches zero
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();  // Trigger the callback when time is up
    }
  }, [timeRemaining, onTimeUp]);  // Dependencies: effect runs when these change

  // Calculate progress percentage for the progress bar
  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="w-full space-y-2">
      {/* Timer display showing remaining seconds */}
      <div className="flex justify-between text-sm text-[#616464]">
        <span>{timeRemaining}s</span>
      </div>
      
      {/* Progress bar showing visual representation of time remaining */}
      <Progress 
        value={progress}         // Current progress percentage
        className="h-2"          // Height styling
        style={{"backgroundColor":"grey"}}  // Background color
      />
    </div>
  );
}