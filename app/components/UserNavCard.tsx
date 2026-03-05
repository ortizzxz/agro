"use client";

import { useState, useRef, useEffect } from "react";
import { User, Languages, LogOut, ChevronRight, Cog } from "lucide-react";

type UserNavCardProps = {
  collapsed?: boolean; // passed from Sidebar
};

export default function UserNavCard({ collapsed }: UserNavCardProps) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Avatar + Click Area */}
      <div
        className={`group flex items-center ${collapsed ? "justify-center" : "space-x-3"
          } bg-surface/50 backdrop-blur-sm border border-gray-300/50 shadow-sm 
        hover:bg-surface hover:shadow-md hover:bg-gray-200 transition-all duration-200 cursor-pointer p-1
        `}
        onClick={() => {
          if (!collapsed)
            setOpen(!open)
        }}
        title={collapsed ? "User Menu" : undefined}
      >
        {/* Avatar */}
        <div className="h-10 w-10 rounded-md  bg-gray-200 border border-gray-300 flex items-center justify-center shadow-sm">
          <User className="h-5 w-5 text-surface" />
        </div>

        {/* User Info */}
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm  truncate group-hover:text-primary  ">
              John Doe
            </p>
            <p className="text-xs">Farm Manager</p>
          </div>
        )}

        {/* Right indicator */}
        {!collapsed && (
          <Cog className="h-5 w-5  group-hover:text-primary transition-all duration-200" />
        )}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute bottom-16 left-1/2 z-50 w-48 -translate-x-1/2 rounded-xl border border-gray-200 
            bg-(--color-surface) shadow-lg backdrop-blur-sm"
        >
          {/* Language Toggle */}
          <div className="p-3 border-b border-gray-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-(--color-text-muted)" />
                <span className="text-sm font-medium text-(--color-text)">Language</span>
              </div>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                    alert(`Language switched to ${lang.code}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                    ${language === lang.code
                      ? "bg-(--color-primary) text-white shadow-sm"
                      : "bg-(--color-muted) text-(--color-text) hover:bg-(--color-primary-hover) hover:text-white"
                    }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Log Out */}
          <button
            className="flex w-full items-center space-x-2 px-4 py-3 text-sm font-medium text-(--color-text) 
              hover:bg-red-50 hover:text-red-600 rounded-b-xl transition-colors duration-200"
            onClick={() => {
              setOpen(false);
              alert("Logging out...");
            }}
          >
            <LogOut className="h-4 w-4 text-(--color-text-muted) group-hover:text-red-500 transition-colors" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}