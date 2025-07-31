import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'default' | 'glow' | 'gradient';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h1', variant = 'default', ...props }, ref) => {
    const baseClasses = 'font-semibold tracking-tight';
    const variantClasses = {
      default: '',
      glow: 'text-glow-cyan',
      gradient: 'bg-gradient-primary bg-clip-text text-transparent'
    };
    
    const sizeClasses = {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
      h5: 'text-lg lg:text-xl',
      h6: 'text-base lg:text-lg'
    };

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[Component],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

export { Heading };