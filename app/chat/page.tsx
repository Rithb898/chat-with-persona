"use client";
import ChatArea from "@/components/chat/ChatArea";
import InputArea from "@/components/chat/InputArea";
import Header from "@/components/navigation/Header";
import PersonaSelectionOverlay from "@/components/overlays/PersonaSelectionOverlay";
import { MoodNotification } from "@/components/ui/mood-notification";
import { useChat } from "@/hooks/useChat";
import { formatTime } from "@/lib/utils";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";

function ChatPage() {
  const {
    messages,
    isTyping,
    showQuickPrompts,
    inputValue,
    setInputValue,
    messagesEndRef,
    inputRef,
    handleSendMessage,
    handleKeyPress,
    parseMarkdown,
    clearChat,
    exportChat,
    currentPersona,
    showPersonaSelection,
    setShowPersonaSelection,
    switchPersona,
    personas,
    moodSystem,
    availableMoods,
    changeMoodInChat,
  } = useChat();

  // const speakMessage = () => {};

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInputValue("");
        inputRef.current?.focus();
      }
      if (e.key === "Enter" && e.ctrlKey && inputValue.trim()) {
        e.preventDefault();
        handleSendMessage(inputValue, currentPersona);
      }
    };
    
    document.addEventListener("keydown", handleGlobalKeyPress);
    return () => document.removeEventListener("keydown", handleGlobalKeyPress);
  }, [inputValue, currentPersona, handleSendMessage, setInputValue, inputRef]);

  return (
    <div className="bg-background relative flex h-screen flex-col overflow-hidden transition-all duration-700">
      <AnimatePresence>
        {showPersonaSelection && (
          <PersonaSelectionOverlay
            setShowPersonaSelection={setShowPersonaSelection}
            personas={personas}
            currentPersona={currentPersona}
            switchPersona={switchPersona}
          />
        )}
      </AnimatePresence>

      <MoodNotification
        show={moodSystem?.showMoodNotification || false}
        moodName={moodSystem?.currentMoodState.name || ""}
        moodEmoji={moodSystem?.currentMoodState.emoji || ""}
        personaName={currentPersona.name}
        onClose={() => moodSystem?.setShowMoodNotification(false)}
      />
      <Header
        currentPersona={currentPersona}
        setShowPersonaSelection={setShowPersonaSelection}
        clearChat={clearChat}
        exportChat={exportChat}
        moodSystem={moodSystem}
        availableMoods={availableMoods}
        changeMoodInChat={changeMoodInChat}
      />
      <ChatArea
        // speakMessage={speakMessage}
        formatTime={formatTime}
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        parseMarkdown={parseMarkdown}
        currentPersona={currentPersona}
        setShowPersonaSelection={setShowPersonaSelection}
      />
      <InputArea
        messages={messages}
        showQuickPrompts={showQuickPrompts}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
        handleKeyPress={handleKeyPress}
        handleSendMessage={() => handleSendMessage(inputValue, currentPersona)}
        currentPersona={currentPersona}
        isTyping={isTyping}
      />
    </div>
  );
}

export default ChatPage;
