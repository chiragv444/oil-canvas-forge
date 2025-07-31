import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card/40">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 OilCanvas. All rights reserved.
          </p>
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors focus-glow rounded-md px-2 py-1"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}