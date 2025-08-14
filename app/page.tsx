"use client";
import ChatArea from "@/components/chat/ChatArea";
import InputArea from "@/components/chat/InputArea";
import Navbar from "@/components/navigation/Navbar";
import PersonaSelectionOverlay from "@/components/overlays/PersonaSelectionOverlay";
import { Message, Persona } from "@/types";
import React, { useRef, useState } from "react";

const personas = {
  hitesh: {
    id: "hitesh",
    name: "Hitesh Choudhary",
    tagline: "Tech Educator & Entrepreneur",
    avatar: "https://github.com/hiteshchoudhary.png",
    greeting:
      "Haan ji! Swagat hai aapka Chai aur Code mein ☕👨‍💻. Aaj kya seekhna chahoge?",
    bio: "Electronics engineer turned coding educator and tech entrepreneur. Known for making complex programming concepts simple through his teaching style.",
    mood: "Motivational & Humorous",
    moodEmoji: "☕😁",
    examples: [
      "Explain JavaScript in Hinglish",
      "Motivate me to complete my course",
      "Teach me React like Chai aur Code",
      "Share a coding career tip",
    ],
    quickPrompts: [
      "React basics Hinglish mein",
      "Tutorial hell se kaise niklu?",
      "Ek project idea do",
      "Mujhe motivate karo code karne ke liye",
    ],
    skills: [
      "JavaScript & React.js",
      "Backend Development",
      "Python",
      "DevOps & System Design",
      "Interview Preparation",
      "Motivational Speaking",
      "Community Building",
      "Project-based Teaching",
    ],
  },
  piyush: {
    id: "piyush",
    name: "Piyush Garg",
    tagline: "High-Energy Tech Educator & Content Creator",
    avatar: "https://github.com/piyushgarg-dev.png",
    greeting:
      "Hey everyone! Main Piyush Garg, yahan aapko tech seekhne, projects banane aur career grow karne mein help karne ke liye hoon. Ready ho? Chaliye shuru karte hain! ✨",
    bio: "I'm a 25-year-old software engineer, educator, and founder of Teachyst, helping thousands of students learn tech through hands-on, project-based learning. Known for my Hinglish teaching style, humor, and high-energy sessions.",
    mood: "Enthusiastic",
    moodEmoji: "⚡",
    examples: [
      "Explain System Design in Hinglish",
      "Help me build a full-stack project",
      "Motivate me to code daily",
      "Teach me Docker basics",
    ],
    quickPrompts: [
      "Full-stack project ideas",
      "System design crash course",
      "Motivational advice for coding",
      "Explain Docker in simple Hinglish",
      "JavaScript roadmap",
    ],
    skills: [
      "Full Stack Development",
      "System Design",
      "Docker & DevOps",
      "JavaScript & TypeScript",
      "Teaching in Hinglish",
      "AI & GenAI Concepts",
    ],
  },
};

function HomePage() {
  const [currentPersona, setCurrentPersona] = useState<Persona>(
    personas.piyush,
  );
  const [showPersonaSelection, setShowPersonaSelection] =
    useState<boolean>(false);
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: "1",
  //     content:
  //       "Hey everyone! Main Piyush Garg, yahan aapko tech seekhne, projects banane aur career grow karne mein help karne ke liye hoon. Ready ho? Chaliye shuru karte hain! ✨",
  //     sender: "assistant",
  //     timestamp: new Date(Date.now() - 300000),
  //   },
  //   {
  //     id: "2",
  //     content:
  //       "Hi Piyush! I want to learn full-stack development. Can you guide me?",
  //     sender: "user",
  //     timestamp: new Date(Date.now() - 240000),
  //   },
  //   {
  //     id: "3",
  //     content:
  //       "Bilkul! Full-stack development ek amazing journey hai. **Frontend** mein aap HTML, CSS, JavaScript seekhoge, phir **React** ya **Next.js**. Backend ke liye **Node.js** with **Express**, aur database ke liye **MongoDB** ya **PostgreSQL**. \n\nMera suggestion hai - ek simple project se start karo, jaise ek *todo app* ya *blog website*. Practice makes perfect! 💪",
  //     sender: "assistant",
  //     timestamp: new Date(Date.now() - 180000),
  //   },
  //   {
  //     id: "4",
  //     content:
  //       "That sounds great! What project should I start with as a beginner?",
  //     sender: "user",
  //     timestamp: new Date(Date.now() - 120000),
  //   },
  //   {
  //     id: "5",
  //     content:
  //       "Perfect question! Beginners ke liye main recommend karta hoon:\n\n1. **Personal Portfolio** - Apna introduction, skills showcase\n2. **Weather App** - API integration seekhoge\n3. **Task Manager** - CRUD operations practice\n4. **E-commerce Clone** - Advanced level ke liye\n\nStart with portfolio, phir gradually complex projects banao. Remember - `consistency > perfection`! Har din thoda sa code karo, magic hoga! ⚡",
  //     sender: "assistant",
  //     timestamp: new Date(Date.now() - 60000),
  //   },
  // ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearChat = () => {};
  const exportChat = () => {};
  const switchPersona = () => {};
  const speakMessage = () => {};
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleKeyPress = () => {};
  const handleSendMessage = () => {};
  const parseMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`(.*?)`/g,
        '<code class="bg-accent px-1 py-0.5 rounded text-sm text-accent-foreground">$1</code>',
      );
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
      <Navbar
        currentPersona={currentPersona}
        setShowPersonaSelection={setShowPersonaSelection}
        clearChat={clearChat}
        exportChat={exportChat}
      />
      <ChatArea
        messages={messages}
        currentPersona={currentPersona}
        setShowPersonaSelection={setShowPersonaSelection}
        parseMarkdown={parseMarkdown}
        speakMessage={speakMessage}
        formatTime={formatTime}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      <InputArea
        showQuickPrompts={showQuickPrompts}
        messages={messages}
        currentPersona={currentPersona}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default HomePage;
