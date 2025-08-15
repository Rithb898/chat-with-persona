import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { Sparkles, RefreshCw } from 'lucide-react';
import { MoodSelectorProps } from '@/types';

export function MoodSelector({
  currentMood,
  currentMoodState,
  availableMoods,
  moods,
  onMoodChange,
  onRandomMood
}: MoodSelectorProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Current Mood</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRandomMood}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {currentMoodState.emoji}
        </Badge>
        <p className="text-sm font-medium">{currentMoodState.name}</p>
        <p className="text-xs text-muted-foreground">{currentMoodState.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {availableMoods.map((moodKey) => {
          const mood = moods[moodKey];
          return (
            <Button
              key={moodKey}
              variant={currentMood === moodKey ? "default" : "outline"}
              size="sm"
              onClick={() => onMoodChange(moodKey)}
              className="h-auto p-2 flex flex-col items-center gap-1 cursor-pointer"
            >
              <span className="text-sm">{mood.emoji}</span>
              <span className="text-xs">{mood.name.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}