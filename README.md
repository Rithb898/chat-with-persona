# AI Persona Chat - Tech Educators

An interactive AI-powered chat application featuring two popular Indian tech educators: **Hitesh Choudhary** and **Piyush Garg**. Experience personalized conversations with dynamic mood systems, streaming responses, and authentic teaching styles.

## ✨ Features

- **🎭 Dual Personas**: Chat with Hitesh Choudhary or Piyush Garg
- **🎯 Dynamic Mood System**: Each persona has multiple moods (Motivational, Chill, Focused, Humorous, etc.)
- **⚡ Real-time Streaming**: Live AI responses with typing indicators
- **🌙 Dark/Light Theme**: Toggle between themes with smooth transitions
- **💬 Smart Quick Prompts**: Context-aware conversation starters
- **📱 Responsive Design**: Works seamlessly on all devices
- **💾 Chat Export**: Save your conversations as JSON
- **🔄 Persona Switching**: Switch between educators mid-conversation
- **🎨 Modern UI**: Built with Tailwind CSS and Radix UI components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rithb898/chat-with-persona
cd persona-project
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Add your Groq API key to `.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎭 Personas

### Hitesh Choudhary
- **Style**: Hinglish, chai lover, motivational
- **Specialties**: Full-stack development, career guidance, practical coding
- **Moods**: Motivational, Chill, Focused, Humorous
- **Signature**: "Chai pe charcha" approach to learning

### Piyush Garg  
- **Style**: Enthusiastic, analytical, project-focused
- **Specialties**: System design, Docker, modern web development
- **Moods**: Enthusiastic, Analytical, Creative, Mentor
- **Signature**: "Alright, so..." explanations with deep technical insights

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **AI**: ChatGPT Open Source Model (gpt-oss-120b) via Groq with streaming
- **State Management**: React Hooks
- **Theme**: next-themes

## 📁 Project Structure

```
├── app/
│   ├── api/ai/          # AI API route with streaming
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main chat interface
├── components/
│   ├── chat/            # Chat-related components
│   ├── navigation/      # Navigation components
│   ├── overlays/        # Modal overlays
│   ├── providers/       # Context providers
│   └── ui/              # Reusable UI components
├── constants/
│   ├── persona.ts       # Persona definitions
│   ├── moods.ts         # Mood system configuration
│   └── systemPrompt.ts  # AI system prompts
├── hooks/
│   ├── useChat.ts       # Main chat logic
│   └── useMoodSystem.ts # Mood management
├── lib/
│   ├── prompts.ts       # AI prompt templates
│   └── utils.ts         # Utility functions
└── types/
    └── index.ts         # TypeScript definitions
```

## 🎨 Key Features Explained

### Dynamic Mood System
Each persona has multiple moods that affect:
- Response tone and style
- Quick prompt suggestions  
- Greeting messages
- Conversation context

### Streaming Responses
Real-time AI responses using Server-Sent Events for a natural chat experience.

### Persona Switching
Seamlessly switch between educators while maintaining conversation context.

### Smart UI
- Typing indicators
- Message timestamps
- Markdown support in responses
- Responsive design
- Theme persistence

## 🚀 Deployment

Deploy easily on Vercel:

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `GROQ_API_KEY` environment variable
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).