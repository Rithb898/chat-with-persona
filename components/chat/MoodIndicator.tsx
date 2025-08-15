import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { MoodSelector } from "../ui/mood-selector";
import { MoodIndicatorProps } from "@/types";

export function MoodIndicator({
  persona,
  moodSystem,
  availableMoods,
  changeMoodInChat,
}: MoodIndicatorProps) {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const moodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moodRef.current && !moodRef.current.contains(event.target as Node)) {
        setShowMoodSelector(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={moodRef}>
      <Button
        variant="ghost"
        size="default"
        onClick={() => setShowMoodSelector(!showMoodSelector)}
        className="flex h-auto cursor-pointer items-center gap-2 p-2"
      >
        <Sparkles className="text-primary h-3 w-3 animate-pulse" />
        <Badge variant="secondary" className="px-1.5 py-1.5 text-sm font-bold">
          {persona.dynamicMood?.emoji || persona.moodEmoji}
          {persona.dynamicMood?.name.split(" ")[0] ||
            persona.mood?.split(" ")[0]}
        </Badge>
        {showMoodSelector ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>

      {showMoodSelector && (
        <div className="absolute top-full left-0 z-50 mt-2 w-64">
          <MoodSelector
            currentMood={moodSystem.currentMood}
            currentMoodState={moodSystem.currentMoodState}
            availableMoods={moodSystem.availableMoods}
            moods={availableMoods}
            onMoodChange={changeMoodInChat || moodSystem.changeMood}
            onRandomMood={moodSystem.cycleMood}
          />
        </div>
      )}
    </div>
  );
}
