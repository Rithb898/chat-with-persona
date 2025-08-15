import React, { useEffect } from 'react';
import { Card } from './card';
import { Badge } from './badge';
import { Sparkles } from 'lucide-react';
import { MoodNotificationProps } from '@/types';

export function MoodNotification({ 
  show, 
  moodName, 
  moodEmoji, 
  personaName, 
  onClose 
}: MoodNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right duration-300">
      <Card className="p-4 bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg animate-pulse-glow">
        <div className="flex items-center gap-3">
          <div className="animate-mood-change">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {personaName} is now feeling
            </p>
            <Badge variant="secondary" className="mt-1">
              {moodEmoji} {moodName}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}