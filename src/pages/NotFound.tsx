import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] flex items-center justify-center bg-grid">
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-6xl font-bold text-glow-cyan">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-block text-primary hover:text-glow-magenta underline-offset-4 hover:underline transition-all duration-300 focus-glow rounded-md px-3 py-2"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
