import { useState, useRef, useEffect } from "react";
import { Message, Persona } from "@/types";
import { personas as importedPersonas } from "@/constants/persona";
import { useMoodSystem } from "./useMoodSystem";
import { hiteshMoods, piyushMoods } from "@/constants/moods";

const personas = {
  hitesh: {
    id: "hitesh" as const,
    name: importedPersonas[0].name,
    tagline: importedPersonas[0].tagline,
    avatar: importedPersonas[0].avatar,
    greeting:
      "Haan ji! Swagat hai aapka Chai aur Code mein ☕👨💻. Aaj kya seekhna chahoge?",
    bio: importedPersonas[0].bio,
    mood: "Motivational & Humorous",
    moodEmoji: "☕😁",
    quickPrompts: [
      "Coding sikhna hai? Kahan se shuru karu?",
      "Tutorial hell se kaise niklu?",
      "Chai pe charcha - React basics",
      "Job ke liye kya skills chahiye?",
      "Mujhe motivate karo bhai!",
    ],
    skills: [
      ...importedPersonas[0].skills.languages,
      ...importedPersonas[0].skills.frameworks,
    ],
  },
  piyush: {
    id: "piyush" as const,
    name: "Piyush Garg",
    tagline: "Tech Educator & Content Creator",
    avatar: "/piyush-sir.webp",
    greeting:
      "Hey everyone! Main Piyush Garg, yahan aapko tech seekhne, projects banane aur career grow karne mein help karne ke liye hoon. Ready ho? Chaliye shuru karte hain! ✨",
    bio: "I'm a 25-year-old software engineer, educator, and founder of Teachyst, helping thousands of students learn tech through hands-on, project-based learning.",
    mood: "Enthusiastic",
    moodEmoji: "⚡",
    quickPrompts: [
      "Alright, so system design kaise seekhu?",
      "Full-stack project ideas do na",
      "Docker samjhao simple mein",
      "100 hour rule kya hai?",
      "AI ke saath coding kaise karu?",
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

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [currentPersona, setCurrentPersona] = useState<Persona>(
    personas.hitesh,
  );
  const [showPersonaSelection, setShowPersonaSelection] = useState(false);
  
  // Mood system integration
  const moodSystem = useMoodSystem(currentPersona.id);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if user is visiting for the first time and restore saved persona
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const savedPersona = localStorage.getItem("selectedPersona") as
      | "hitesh"
      | "piyush";

    if (savedPersona && personas[savedPersona]) {
      setCurrentPersona(personas[savedPersona]);
    }

    if (!hasVisited) {
      setShowPersonaSelection(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const clearChat = () => {
    setMessages([]);
    setShowQuickPrompts(true);
  };

  const exportChat = () => {
    const chatData = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-export.json";
    a.click();
  };

  // const handleSendMessage = async (content: string, persona: Persona) => {
  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     content,
  //     sender: "user",
  //     timestamp: new Date(),
  //   };
  //   setMessages((prev) => [...prev, newMessage]);
  //   setInputValue("");
  //   setShowQuickPrompts(false);
  //   setIsTyping(true);

  //   try {
  //     const response = await fetch("/api/ai", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         message: content,
  //         persona: persona.id,
  //         history: messages,
  //       }),
  //     });

  //     const data = await response.json();

  //     const aiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: data.message,
  //       sender: "assistant",
  //       timestamp: new Date(),
  //     };

  //     console.log(aiMessage);

  //     setMessages((prev) => [...prev, aiMessage]);
  //   } catch (error) {
  //     console.error("AI API error:", error);
  //   } finally {
  //     setIsTyping(false);
  //   }
  // };

  const handleSendMessage = async (content: string, persona: Persona) => {
    // Update mood based on user message
    moodSystem.updateMoodBasedOnMessage(content);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setShowQuickPrompts(false);
    setIsTyping(true);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      content: "",
      sender: "assistant",
      timestamp: new Date(),
    };
    let firstChunkReceived = false;

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          persona: persona.id,
          history: messages,
          currentMood: moodSystem.currentMoodState,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line.slice(6).trim()) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                if (!firstChunkReceived) {
                  // Create AI message box on first chunk
                  const aiMessage: Message = {
                    id: aiMessageId,
                    content: data.content,
                    sender: "assistant",
                    timestamp: new Date(),
                  };
                  setMessages((prev) => [...prev, aiMessage]);
                  firstChunkReceived = true;
                } else {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === aiMessageId
                        ? { ...msg, content: msg.content + data.content }
                        : msg,
                    ),
                  );
                }
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("AI API error:", error);
      // Remove the placeholder message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== aiMessageId));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, currentPersona: any) => {
    if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
      e.preventDefault();
      handleSendMessage(inputValue, currentPersona);
    }
  };

  const parseMarkdown = (text: string) => {
    return (
      text
        // Code blocks with language
        .replace(
          /```(\w+)?\n([\s\S]*?)```/g,
          '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>',
        )
        // Inline code
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-accent px-1 py-0.5 rounded text-sm text-accent-foreground">$1</code>',
        )
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Italic text
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Line breaks
        .replace(/\n/g, "<br>")
    );
  };

  const switchPersona = (personaId: "hitesh" | "piyush") => {
    setMessages([]);
    const basePersona = personas[personaId];
    setCurrentPersona({
      ...basePersona,
      currentMoodKey: moodSystem.currentMood,
      dynamicMood: {
        name: moodSystem.currentMoodState.name,
        emoji: moodSystem.currentMoodState.emoji,
        description: moodSystem.currentMoodState.description
      },
      greeting: moodSystem.currentMoodState.greeting,
      quickPrompts: moodSystem.currentMoodState.quickPrompts
    });
    setShowPersonaSelection(false);
    setShowQuickPrompts(true);
    localStorage.setItem("selectedPersona", personaId);
  };
  
  const changeMoodInChat = (moodKey: string) => {
    moodSystem.changeMood(moodKey);
  };
  
  // Update persona when mood changes
  useEffect(() => {
    if (moodSystem.currentMood) {
      const basePersona = personas[currentPersona.id];
      setCurrentPersona(prev => ({
        ...prev,
        currentMoodKey: moodSystem.currentMood,
        dynamicMood: {
          name: moodSystem.currentMoodState.name,
          emoji: moodSystem.currentMoodState.emoji,
          description: moodSystem.currentMoodState.description
        },
        greeting: moodSystem.currentMoodState.greeting,
        quickPrompts: moodSystem.currentMoodState.quickPrompts
      }));
    }
  }, [moodSystem.currentMood, moodSystem.currentMoodState]);

  return {
    messages,
    isTyping,
    showQuickPrompts,
    inputValue,
    setInputValue,
    messagesEndRef,
    inputRef,
    clearChat,
    exportChat,
    handleSendMessage,
    handleKeyPress,
    parseMarkdown,
    currentPersona,
    showPersonaSelection,
    setShowPersonaSelection,
    switchPersona,
    personas,
    moodSystem,
    availableMoods: currentPersona.id === 'hitesh' ? hiteshMoods : piyushMoods,
    changeMoodInChat,
  };
}
