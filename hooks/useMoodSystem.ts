import { useState, useEffect } from 'react';
import { hiteshMoods, piyushMoods, moodTriggers, MoodState } from '@/constants/moods';

export function useMoodSystem(personaId: 'hitesh' | 'piyush') {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<string[]>([]);
  const [showMoodNotification, setShowMoodNotification] = useState(false);

  const moods = personaId === 'hitesh' ? hiteshMoods : piyushMoods;

  // Get current mood state
  const getCurrentMoodState = (): MoodState => {
    return moods[currentMood] || moods[Object.keys(moods)[0]];
  };

  // Determine mood based on time of day
  const getMoodByTime = (): string => {
    const hour = new Date().getHours();
    let timeOfDay: keyof typeof moodTriggers.timeOfDay;
    
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';

    const possibleMoods = moodTriggers.timeOfDay[timeOfDay];
    const availableMoods = possibleMoods.filter(mood => moods[mood]);
    
    return availableMoods[Math.floor(Math.random() * availableMoods.length)] || Object.keys(moods)[0];
  };

  // Analyze message sentiment and suggest mood
  const analyzeSentiment = (message: string): keyof typeof moodTriggers.userSentiment => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('problem')) {
      return 'frustrated';
    }
    if (lowerMessage.includes('excited') || lowerMessage.includes('awesome') || lowerMessage.includes('amazing')) {
      return 'excited';
    }
    if (lowerMessage.includes('confused') || lowerMessage.includes('understand') || lowerMessage.includes('explain')) {
      return 'confused';
    }
    return 'casual';
  };

  // Determine conversation context
  const getConversationContext = (message: string): keyof typeof moodTriggers.conversationContext => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('system') || lowerMessage.includes('architecture') || lowerMessage.includes('database')) {
      return 'technical';
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('interview')) {
      return 'career';
    }
    if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('create')) {
      return 'project';
    }
    return 'casual';
  };

  // Update mood based on user message
  const updateMoodBasedOnMessage = (message: string) => {
    const sentiment = analyzeSentiment(message);
    const context = getConversationContext(message);
    
    const sentimentMoods = moodTriggers.userSentiment[sentiment];
    const contextMoods = moodTriggers.conversationContext[context];
    
    // Find intersection of sentiment and context moods
    const possibleMoods = sentimentMoods.filter(mood => 
      contextMoods.includes(mood) && moods[mood]
    );
    
    if (possibleMoods.length > 0) {
      const newMood = possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
      changeMood(newMood);
    }
  };

  // Manually change mood
  const changeMood = (moodKey: string) => {
    if (moods[moodKey] && moodKey !== currentMood) {
      setMoodHistory(prev => [...prev.slice(-4), currentMood].filter(Boolean));
      setCurrentMood(moodKey);
      setShowMoodNotification(true);
    }
  };

  // Get random mood
  const getRandomMood = (): string => {
    const moodKeys = Object.keys(moods);
    const availableMoods = moodKeys.filter(mood => mood !== currentMood);
    return availableMoods[Math.floor(Math.random() * availableMoods.length)];
  };

  // Cycle through moods periodically
  const cycleMood = () => {
    const newMood = getRandomMood();
    changeMood(newMood);
  };

  // Initialize mood on mount
  useEffect(() => {
    if (!currentMood) {
      const initialMood = getMoodByTime();
      setCurrentMood(initialMood);
    }
  }, [personaId]);

  // Auto mood cycling (optional - can be enabled/disabled)
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance to randomly change mood every 5 minutes
      if (Math.random() < 0.1) {
        cycleMood();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentMood]);

  return {
    currentMood,
    currentMoodState: getCurrentMoodState(),
    availableMoods: Object.keys(moods),
    moodHistory,
    changeMood,
    updateMoodBasedOnMessage,
    cycleMood,
    getMoodByTime,
    showMoodNotification,
    setShowMoodNotification
  };
}