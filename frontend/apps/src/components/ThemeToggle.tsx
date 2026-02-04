"use client";

import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-full px-2 py-1">
      <button
        onClick={() => setTheme("light")}
        className={theme === "light" ? "text-primary" : "text-muted-foreground"}
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "text-primary" : "text-muted-foreground"}
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={
          theme === "system" ? "text-primary" : "text-muted-foreground"
        }
      >
        <Laptop size={18} />
      </button>
    </div>
  );
}
