import React from "react";
import { Download, MoreVertical, SkipBack, Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { MoodIndicator } from "../chat/MoodIndicator";
import { MoodState } from "@/constants/moods";
import { Persona } from "@/types";

function Header({
  currentPersona,
  setShowPersonaSelection,
  clearChat,
  exportChat,
  moodSystem,
  availableMoods,
  changeMoodInChat,
}: {
  currentPersona: Persona;
  setShowPersonaSelection: (show: boolean) => void;
  clearChat: () => void;
  exportChat: () => void;
  moodSystem?: {
    currentMood: string;
    currentMoodState: MoodState;
    availableMoods: string[];
    changeMood: (mood: string) => void;
    cycleMood: () => void;
  };
  availableMoods?: Record<string, MoodState>;
  changeMoodInChat?: (mood: string) => void;
}) {
  return (
    <header className="bg-card/90 border-border sticky top-0 z-10 border-b shadow-lg backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-4xl py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex gap-2 items-center hover:bg-accent hover:text-accent-foreground border-border transition-all duration-300 hover:scale-105 rounded-full cursor-pointer"
              >
                <SkipBack className="h-4 w-4" /> Back
              </Button>
            </Link>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="animate-float border-primary/20 h-10 w-10 cursor-pointer border-2 transition-all duration-300 hover:scale-110 hover:animate-none md:h-12 md:w-12">
                  <AvatarImage
                    src={currentPersona.avatar}
                    alt={currentPersona.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentPersona.name[0]}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="bg-card border-border w-80">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="border-border h-10 w-10 border md:h-12 md:w-12">
                      <AvatarImage
                        src={currentPersona.avatar}
                        alt={currentPersona.name}
                      />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {currentPersona.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-card-foreground font-semibold">
                        {currentPersona.name}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground text-xs"
                      >
                        {currentPersona.dynamicMood
                          ? `${currentPersona.dynamicMood.name} ${currentPersona.dynamicMood.emoji}`
                          : `${currentPersona.mood} ${currentPersona.moodEmoji}`}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {currentPersona.bio}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-card-foreground text-md font-bold transition-all duration-300 md:text-xl">
                  {currentPersona.name}
                </h1>
                <span className="animate-bounce text-xl">
                  {currentPersona.dynamicMood?.emoji ||
                    currentPersona.moodEmoji}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {currentPersona.tagline}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center space-x-2">
            {moodSystem && availableMoods && (
              <MoodIndicator
                persona={currentPersona}
                moodSystem={moodSystem}
                availableMoods={availableMoods}
                changeMoodInChat={changeMoodInChat}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPersonaSelection(true)}
              className="border-border hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full transition-all duration-300 hover:scale-105"
            >
              Switch Mentor
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent h-8 w-8 cursor-pointer p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border"
              >
                <DropdownMenuItem
                  onClick={clearChat}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear chat
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={exportChat}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
