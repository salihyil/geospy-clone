"use client";

import { Button } from "@/components/ui/button";
import { useHeaderStore } from "@/store/useHeaderStore";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useHeaderStore();
  const { setTheme: setNextTheme } = useTheme();

  const handleThemeChange = () => {
    const newTheme =
      theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(newTheme);
    setNextTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}; 