import { MoodState } from "@/constants/moods";

export interface Persona {
  id: "hitesh" | "piyush";
  name: string;
  avatar?: string;
  tagline?: string;
  mood?: string;
  moodEmoji?: string;
  bio?: string;
  skills: string[];
  greeting: string;
  quickPrompts: string[];
  currentMoodKey?: string;
  dynamicMood?: {
    name: string;
    emoji: string;
    description: string;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export interface MoodSelectorProps {
  currentMood: string;
  currentMoodState: MoodState;
  availableMoods: string[];
  moods: Record<string, MoodState>;
  onMoodChange: (mood: string) => void;
  onRandomMood: () => void;
}

export interface MoodNotificationProps {
  show: boolean;
  moodName: string;
  moodEmoji: string;
  personaName: string;
  onClose: () => void;
}

export interface MoodIndicatorProps {
  persona: Persona;
  moodSystem: {
    currentMood: string;
    currentMoodState: MoodState;
    availableMoods: string[];
    changeMood: (mood: string) => void;
    cycleMood: () => void;
  };
  availableMoods: Record<string, MoodState>;
  changeMoodInChat?: (mood: string) => void;
}