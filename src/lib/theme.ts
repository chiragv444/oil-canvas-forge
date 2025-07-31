export function getStoredTheme(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme');
}

export function setStoredTheme(theme: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: string): void {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}