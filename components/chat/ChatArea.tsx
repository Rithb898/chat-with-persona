import { Message, Persona } from "@/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Button } from "../ui/button";
import TypingIndicator from "./TypingIndicator";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatArea({
  messages,
  parseMarkdown,
  // speakMessage,
  formatTime,
  isTyping,
  messagesEndRef,
  currentPersona,
  setShowPersonaSelection,
}: {
  messages: Message[];
  parseMarkdown: (content: string) => string;
  // speakMessage: (message: Message) => void;
  formatTime: (timestamp: Date) => string;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  currentPersona: Persona;
  setShowPersonaSelection: (show: boolean) => void;
}) {
  return (
    <main className="flex-1 overflow-hidden">
      <div className="mx-auto flex h-full max-w-4xl flex-col">
        <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto scroll-smooth px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-2xl space-y-8 text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <Avatar className="animate-float border-primary/20 mx-auto h-32 w-32 border-4 transition-all duration-500 hover:animate-bounce">
                      <AvatarImage
                        src={currentPersona.avatar || "/placeholder.svg"}
                        alt={currentPersona.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                        {currentPersona.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-4">
                    <h2 className="animate-in fade-in slide-in-from-bottom text-foreground text-3xl font-bold duration-700">
                      Hello! I&apos;m {currentPersona.name}
                    </h2>
                    <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom text-lg delay-200 duration-700">
                      {currentPersona.greeting}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowPersonaSelection(true)}
                      className="animate-in fade-in slide-in-from-bottom border-border hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all delay-400 duration-700 hover:scale-105"
                    >
                      Switch Mentor
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`flex max-w-xs items-start space-x-2 sm:max-w-lg lg:max-w-2xl ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    {message.sender === "assistant" && (
                      <Avatar className="animate-float border-border mt-1 h-8 w-8 border hover:animate-bounce">
                        <AvatarImage
                          src={currentPersona.avatar || "/placeholder.svg"}
                          alt={currentPersona.name}
                        />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {currentPersona.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="space-y-1">
                      <div
                        className={`px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                          message.sender === "user"
                            ? "bg-primary text-foreground rounded-[20px] rounded-br-[8px] font-semibold shadow-lg"
                            : "bg-card text-card-foreground border-border rounded-[20px] rounded-bl-[8px] border shadow-lg"
                        }`}
                      >
                        <div className="text-sm font-semibold">
                          {message.content.split("```").map((block, blockIndex) => {
                            if (blockIndex % 2 === 0) {
                              return (
                                <div
                                  key={blockIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: parseMarkdown(block.trim()),
                                  }}
                                />
                              );
                            } else {
                              const [language, ...code] = block.split("\n");
                              const codeContent = code.join("\n").trim();
                              return (
                                <SyntaxHighlighter
                                  key={blockIndex}
                                  language={language || "text"}
                                  style={oneDark}
                                >
                                  {codeContent}
                                </SyntaxHighlighter>
                              );
                            }
                          })}
                        </div>
                        {/* {message.sender === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakMessage(message)}
                            className="hover:bg-accent text-accent-foreground mt-2 h-6 w-6 p-0 opacity-50 hover:opacity-100"
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )} */}
                      </div>
                      <p
                        className={`text-muted-foreground px-2 text-xs ${message.sender === "user" ? "text-right" : "text-left"}`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator currentPersona={currentPersona} />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default ChatArea;
