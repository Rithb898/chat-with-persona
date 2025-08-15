import { Message, Persona } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Loader2 } from "lucide-react";
import { motion } from "motion/react";

function InputArea({
  showQuickPrompts,
  messages,
  inputValue,
  setInputValue,
  inputRef,
  handleKeyPress,
  handleSendMessage,
  currentPersona,
  isTyping,
}: {
  showQuickPrompts: boolean;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  inputRef: any;
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentPersona: Persona,
  ) => void;
  handleSendMessage: () => void;
  currentPersona: Persona;
  isTyping: boolean;
}) {
  return (
    <div className="bg-card/90 border-border sticky bottom-0 border-t shadow-lg backdrop-blur-md">
      <div className="mx-auto max-w-4xl space-y-3 p-4">
        {showQuickPrompts && messages.length === 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {currentPersona.quickPrompts.map((prompt, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue(prompt);
                  // handleSendMessage();
                }}
                className="animate-in fade-in slide-in-from-bottom bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full text-xs transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, currentPersona)}
              placeholder={`Message ${currentPersona.name}...`}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring h-12 rounded-full pr-14 text-base shadow-inner transition-all duration-200 focus:ring-2"
            />
            {/* <Button
              size="sm"
              variant="ghost"
              onClick={toggleRecording}
              className={`hover:bg-accent absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full p-0 transition-all duration-200 ${
                isRecording
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "text-accent-foreground"
              }`}
            >
              <Mic className="h-4 w-4" />
            </Button> */}
          </div>

          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 cursor-pointer rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default InputArea;
