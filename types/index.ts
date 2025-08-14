// export interface Persona {
//   id: "hitesh" | "piyush";
//   name: string;
//   tagline: string;
//   avatar: string;
//   greeting: string;
//   bio: string;
//   mood: string;
//   moodEmoji: string;
//   examples: string[];
//   quickPrompts: string[];
//   skills: string[];
// }

export interface Persona {
  id: string | number;
  name: string;
  avatar?: string;
  tagline?: string;
  mood?: string;
  moodEmoji?: string;
  bio?: string;
  skills: string[];
}
