"use client";

import { useState, useRef, useEffect } from "react";
import { User, Languages, LogOut, Globe, ChevronRight } from "lucide-react";

export default function UserNavCard() {
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
  }, [ref]);

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* User Avatar + Click Area */}
      <div
        className="group flex items-center space-x-3 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border/50 p-3 shadow-sm 
         hover:bg-surface hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Avatar */}
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
          <User className="h-5 w-5 text-surface" />
        </div>
        
        {/* User Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text truncate group-hover:text-primary transition-colors">
            John Doe
          </p>
          <p className="text-xs text-muted">Farm Manager</p>
        </div>
        
        {/* Right indicator */}
        <ChevronRight className="h-4 w-4 text-muted group-hover:text-primary transition-all duration-200" />
      </div>

      {/* Dropdown Menu - Opens to RIGHT */}
      {open && (
               <div className="absolute bottom-1 left-50 mb-2 w-50 rounded-2xl bg-surface shadow-xl border border-border/50 z-50">

          
          {/* Language Toggle Section */}
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center space-x-2 mb-4">
              <Languages className="h-4 w-4 text-muted" />
              <span className="text-sm font-semibold text-text">Language</span>
            </div>
            
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`group flex w-full items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    language === lang.code
                      ? "bg-primary text-surface shadow-sm font-semibold"
                      : "hover:bg-surface hover:text-primary hover:shadow-sm text-text"
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                    alert(lang.code);
                  }}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1">{lang.name}</span>
                  {language === lang.code && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Log Out */}
          <button
            className="group flex w-full items-center space-x-3 rounded-b-2xl px-4 py-4 text-sm font-medium text-text 
                     hover:bg-accent/10 hover:text-accent transition-all duration-200"
            onClick={() => {
              setOpen(false);
              alert('logout');
            }}
          >
            <LogOut className="h-4 w-4 group-hover:text-accent transition-colors" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
