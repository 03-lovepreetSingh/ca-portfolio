"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render icon after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute transition-opacity duration-300 ${
          mounted && !isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sun className="size-4" />
      </span>
      <span
        aria-hidden
        className={`absolute transition-opacity duration-300 ${
          mounted && isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Moon className="size-4" />
      </span>
      {/* Invisible placeholder keeps button width stable */}
      <Sun className="size-4 opacity-0" aria-hidden />
    </Button>
  );
}
