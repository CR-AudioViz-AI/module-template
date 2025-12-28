"use client";

import { useState } from "react";

interface JavariChatProps {
  moduleContext: string;
}

export function JavariChat({ moduleContext }: JavariChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[500px] bg-white rounded-lg shadow-xl border flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-semibold">Javari AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          <iframe
            src={`https://javariai.com/embed?context=${moduleContext}`}
            className="flex-1 w-full border-0"
            title="Javari AI Assistant"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-transform hover:scale-110"
          aria-label="Open Javari AI Assistant"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}
    </div>
  );
}

