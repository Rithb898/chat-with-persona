"use client";
import ChatArea from "@/components/chat/ChatArea";
import InputArea from "@/components/chat/InputArea";
import Navbar from "@/components/navigation/Navbar";
import PersonaSelectionOverlay from "@/components/overlays/PersonaSelectionOverlay";
import { MoodNotification } from "@/components/ui/mood-notification";
import { useChat } from "@/hooks/useChat";
import { formatTime } from "@/lib/utils";
import { useEffect } from "react";

function HomePage() {
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

  const speakMessage = () => {};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background relative flex h-screen flex-col overflow-hidden transition-all duration-700">
      {showPersonaSelection && (
        <PersonaSelectionOverlay
          setShowPersonaSelection={setShowPersonaSelection}
          personas={personas}
          currentPersona={currentPersona}
          switchPersona={switchPersona}
        />
      )}
      
      <MoodNotification
        show={moodSystem?.showMoodNotification || false}
        moodName={moodSystem?.currentMoodState.name || ''}
        moodEmoji={moodSystem?.currentMoodState.emoji || ''}
        personaName={currentPersona.name}
        onClose={() => moodSystem?.setShowMoodNotification(false)}
      />
      <Navbar
        currentPersona={currentPersona}
        setShowPersonaSelection={setShowPersonaSelection}
        clearChat={clearChat}
        exportChat={exportChat}
        moodSystem={moodSystem}
        availableMoods={availableMoods}
        changeMoodInChat={changeMoodInChat}
      />
      <ChatArea
        speakMessage={speakMessage}
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
      />
    </div>
  );
}

export default HomePage;
