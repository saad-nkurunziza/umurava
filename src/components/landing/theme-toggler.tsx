"use client";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex -space-x-px rounded-full shadow-sm rtl:space-x-reverse">
      <Button
        className={`rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
          theme === "light" ? "bg-accent" : ""
        }`}
        variant="outline"
        size="icon"
        aria-label="Toggle Light Theme"
        onClick={() => setTheme("light")}
      >
        <Sun size={16} />
      </Button>
      <Button
        className={`rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
          theme === "dark" ? "bg-accent" : ""
        }`}
        variant="outline"
        size="icon"
        aria-label="Toggle Dark Theme"
        onClick={() => setTheme("dark")}
      >
        <Moon size={16} />
      </Button>
    </div>
  );
}
