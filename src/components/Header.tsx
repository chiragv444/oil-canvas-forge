import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold text-glow-cyan group-hover:text-glow-magenta transition-all duration-300">
            OilCanvas
          </span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary focus-glow rounded-md px-3 py-2 ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-primary focus-glow rounded-md px-3 py-2 ${
              location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}