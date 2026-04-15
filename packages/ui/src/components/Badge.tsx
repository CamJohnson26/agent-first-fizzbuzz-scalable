import React from 'react';
import { cn } from '../utils.js';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'error';
}

export function Badge({
  className,
  variant = 'primary',
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border-secondary/30',
    outline: 'border-border text-foreground',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    error: 'bg-error/20 text-error border-error/30',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
