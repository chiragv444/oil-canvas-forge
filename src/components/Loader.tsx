import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  text?: string;
}

export function Loader({ className, text = "Generating oil-painted image..." }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 py-12", className)}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-primary blur-lg opacity-20 animate-pulse" />
        <div className="relative rounded-full border-2 border-primary/20 bg-card p-4 glow-cyan">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p 
          className="text-lg font-medium text-foreground"
          aria-live="polite"
          role="status"
        >
          {text}
        </p>
        <div className="flex justify-center space-x-1">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}