
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check user preference or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme as "light" | "dark");
    applyTheme(initialTheme as "light" | "dark");
  }, []);
  
  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 border-border bg-background text-foreground hover:bg-muted"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
