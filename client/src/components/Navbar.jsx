import React from "react";
import { Button } from "../components/ui";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun, Sparkles } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#008055] to-[#0A6647] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-2xl font-medium text-gray-900 dark:text-white"
              style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
            >
              Prompt Vision
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Pricing
            </a>
            <a
              href="#contact-us"
              className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-[#008055]"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Sign In
            </Button>

            <Button
              className="bg-[#008055] hover:bg-[#0A6647] active:bg-[#124E3B] text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
