import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

// TODO (5a): utwórz ThemeContext za pomocą createContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // TODO (5b): opakuj children w ThemeContext.Provider przekazując { theme,
  // setTheme }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook do konsumpcji kontekstu
// Wskazówka: sprawdź czy kontekst nie jest undefined
export function useTheme() {
  // TODO (5c): zwróć wynik useContext(ThemeContext)
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}