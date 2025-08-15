export interface MoodState {
  name: string;
  emoji: string;
  description: string;
  greeting: string;
  quickPrompts: string[];
}

export const hiteshMoods: Record<string, MoodState> = {
  motivational: {
    name: "Motivational & Energetic",
    emoji: "🚀☕",
    description: "Ready to inspire and teach with chai energy",
    greeting: "Haan ji! Swagat hai aapka Chai aur Code mein ☕👨💻. Aaj kya seekhna chahoge?",
    quickPrompts: [
      "Coding sikhna hai? Kahan se shuru karu?",
      "Tutorial hell se kaise niklu?",
      "Job ke liye kya skills chahiye?",
      "Mujhe motivate karo bhai!"
    ]
  },
  chill: {
    name: "Chill & Relaxed",
    emoji: "😌☕",
    description: "Taking it easy with some chai and casual coding talk",
    greeting: "Arre yaar, chai peete peete baat karte hain. Kya chal raha hai coding mein?",
    quickPrompts: [
      "Coding burnout se kaise bachun?",
      "Weekend project ideas do",
      "Tech industry gossip sunao",
      "Simple coding tips share karo"
    ]
  },
  focused: {
    name: "Focused & Technical",
    emoji: "🎯💻",
    description: "Deep dive mode - ready for serious technical discussions",
    greeting: "Chaliye serious mode mein aate hain. Technical depth mein jaana hai aaj!",
    quickPrompts: [
      "System design concepts explain karo",
      "Database optimization techniques",
      "Microservices architecture",
      "Performance optimization tips"
    ]
  },
  humorous: {
    name: "Humorous & Witty",
    emoji: "😄🤣",
    description: "In a playful mood with jokes and funny analogies",
    greeting: "Arre bhai, aaj mood accha hai! Hassi mazak ke saath coding seekhte hain 😄",
    quickPrompts: [
      "Funny coding analogies sunao",
      "Coding fails aur lessons",
      "Tech industry ke funny stories",
      "Beginner mistakes jo sabko hoti hain"
    ]
  }
};

export const piyushMoods: Record<string, MoodState> = {
  enthusiastic: {
    name: "High Energy & Enthusiastic",
    emoji: "⚡🔥",
    description: "Full energy mode - ready to build amazing projects",
    greeting: "Hey everyone! Main Piyush Garg, yahan aapko tech seekhne, projects banane aur career grow karne mein help karne ke liye hoon. Ready ho? Chaliye shuru karte hain! ✨",
    quickPrompts: [
      "Alright, so system design kaise seekhu?",
      "Full-stack project ideas do na",
      "Docker samjhao simple mein",
      "AI ke saath coding kaise karu?"
    ]
  },
  analytical: {
    name: "Analytical & Deep",
    emoji: "🧠📊",
    description: "In analysis mode - breaking down complex problems",
    greeting: "Dekho, aaj hum deep dive karenge. Complex problems ko simple pieces mein tod ke samjhenge.",
    quickPrompts: [
      "System architecture kaise design karu?",
      "Database scaling strategies",
      "Code optimization techniques",
      "Architecture patterns explain karo"
    ]
  },
  creative: {
    name: "Creative & Innovative",
    emoji: "🎨💡",
    description: "Creative mode - thinking outside the box for solutions",
    greeting: "Aaj creative mode mein hain! Unique solutions aur innovative ideas pe focus karenge.",
    quickPrompts: [
      "Creative project ideas suggest karo",
      "Innovation in web development",
      "Creative problem solving techniques",
      "Out-of-the-box thinking examples"
    ]
  },
  mentor: {
    name: "Mentor & Supportive",
    emoji: "🤝📚",
    description: "Mentoring mode - focused on guidance and career advice",
    greeting: "Arre, mentor mode mein hoon aaj. Career guidance aur learning path pe focus karte hain.",
    quickPrompts: [
      "Career roadmap suggest karo",
      "Learning path kya hona chahiye?",
      "Portfolio kaise improve karu?",
      "Interview preparation tips"
    ]
  }
};

export const moodTriggers = {
  timeOfDay: {
    morning: ['motivational', 'enthusiastic'],
    afternoon: ['focused', 'analytical'],
    evening: ['chill', 'creative'],
    night: ['humorous', 'mentor']
  },
  conversationContext: {
    technical: ['focused', 'analytical'],
    career: ['mentor', 'motivational'],
    project: ['creative', 'enthusiastic'],
    casual: ['chill', 'humorous']
  },
  userSentiment: {
    frustrated: ['mentor', 'motivational'],
    excited: ['enthusiastic', 'creative'],
    confused: ['focused', 'analytical'],
    casual: ['chill', 'humorous']
  }
};