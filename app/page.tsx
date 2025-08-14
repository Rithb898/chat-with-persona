"use client";
import ChatArea from "@/components/ChatArea";
import Navbar from "@/components/Navbar";
import PersonaSelectionOverlay from "@/components/PersonaSelectionOverlay";
import { Persona } from "@/types";
import React, { useState } from "react";

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

  const clearChat = () => {};
  const exportChat = () => {};
  const switchPersona = () => {};

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
      <ChatArea />
    </div>
  );
}

export default HomePage;
