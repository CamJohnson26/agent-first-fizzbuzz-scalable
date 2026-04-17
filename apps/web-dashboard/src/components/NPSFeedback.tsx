import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Textarea,
} from '@fizzbuzz/ui';
import { MessageSquare, X } from 'lucide-react';

interface NPSFeedbackProps {
  onSubmit: (score: number, comment: string) => void;
  onDismiss: () => void;
}

export function NPSFeedback({ onSubmit, onDismiss }: NPSFeedbackProps) {
  const [step, setStep] = useState<'score' | 'comment'>('score');
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleScoreSelect = (s: number) => {
    setScore(s);
    setStep('comment');
  };

  const handleSubmit = () => {
    if (score !== null) {
      onSubmit(score, comment);
    }
  };

  return (
    <Card className="fixed bottom-6 right-6 w-96 shadow-2xl border-primary/20 animate-in slide-in-from-bottom-10 duration-500 z-50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
            <MessageSquare className="w-4 h-4" />
          </div>
          <CardTitle className="text-md">Quick Feedback</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onDismiss} className="h-8 w-8 p-0 rounded-full">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {step === 'score' ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              How likely are you to recommend FizzBuzz Scalable to a colleague?
            </p>
            <div className="grid grid-cols-11 gap-1">
              {[...Array(11).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => handleScoreSelect(n)}
                  className={`
                    h-8 flex items-center justify-center text-xs font-bold rounded transition-colors
                    ${score === n 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary'}
                  `}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-semibold">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              What is the main reason for your score of <span className="text-primary font-bold">{score}</span>?
            </p>
            <Textarea
              placeholder="Tell us more..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">
                Submit Feedback
              </Button>
              <Button variant="ghost" onClick={() => setStep('score')} size="sm">
                Back
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
