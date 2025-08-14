export interface Persona {
  id: string | number;
  name: string;
  avatar?: string;
  tagline?: string;
  mood?: string;
  moodEmoji?: string;
  bio?: string;
  skills: string[];
  greeting: string;
  quickPrompts: string[];
}

export interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}
