import React, { useState, useCallback } from 'react';
import { Lightbulb, X, Zap } from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardContent, cn } from '@fizzbuzz/ui';

function getRandomTip() {
  const num = Math.floor(Math.random() * 1000) + 1;
  let result = '';
  if (num % 15 === 0) result = 'FizzBuzz';
  else if (num % 3 === 0) result = 'Fizz';
  else if (num % 5 === 0) result = 'Buzz';
  else result = num.toString();
  return { number: num, result };
}

export function TipOfTheDay() {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState<{ number: number; result: string }>(getRandomTip);

  const generateTip = useCallback(() => {
    setTip(getRandomTip());
    setIsOpen(true);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={generateTip}
        className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
      >
        <Lightbulb className="w-4 h-4" />
        What&apos;s the buzz?
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-background/95 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <Card className="w-full max-w-md shadow-2xl border-primary/20 animate-in zoom-in-95 duration-200 my-8 md:my-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary fill-primary/20" />
                Tip of the Day!
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-6 text-center">
              <div className="p-8 bg-muted/50 rounded-2xl border border-border flex flex-col items-center justify-center space-y-4">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Random Number</span>
                <span className="text-6xl font-black text-foreground tabular-nums tracking-tighter">{tip?.number}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">FizzBuzz Value</p>
                <p className={cn(
                  "text-3xl font-bold px-6 py-2 rounded-xl inline-block shadow-sm transition-all",
                  tip?.result === 'Fizz' ? "bg-warning/10 text-warning border border-warning/20" :
                  tip?.result === 'Buzz' ? "bg-secondary/10 text-secondary border border-secondary/20" :
                  tip?.result === 'FizzBuzz' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" :
                  "bg-muted text-foreground border border-border"
                )}>
                  {tip?.result}
                </p>
              </div>

              <p className="text-xs text-muted-foreground italic pt-4">
                Did you know? Our enterprise-grade engine verified this result in under 0.001ms!
              </p>
              
              <Button onClick={() => setIsOpen(false)} className="w-full mt-4">
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
