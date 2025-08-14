import React from "react";
import { Download, MoreVertical, Trash2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

function Navbar({
  currentPersona,
  setShowPersonaSelection,
  clearChat,
  exportChat,
}: {
  currentPersona: any;
  setShowPersonaSelection: any;
  clearChat: () => void;
  exportChat: () => void;
}) {
  return (
    <header className="bg-card/90 border-border sticky top-0 z-10 border-b shadow-lg backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="animate-float border-primary/20 h-12 w-12 cursor-pointer border-2 transition-all duration-300 hover:scale-110 hover:animate-none">
                  <AvatarImage
                    src={currentPersona.avatar || "/placeholder.svg"}
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
                    <Avatar className="border-border h-12 w-12 border">
                      <AvatarImage
                        src={currentPersona.avatar || "/placeholder.svg"}
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
                        {currentPersona.mood} {currentPersona.moodEmoji}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {currentPersona.bio}
                  </p>
                  <div>
                    <p className="text-card-foreground mb-2 text-xs font-medium">
                      Try asking about:
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {currentPersona.examples.map((example: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-border text-muted-foreground text-xs"
                        >
                          {example}
                        </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-card-foreground text-xl font-bold transition-all duration-300">
                  {currentPersona.name}
                </h1>
                <span className="animate-bounce text-xl">
                  {currentPersona.moodEmoji}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {currentPersona.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPersonaSelection(true)}
              className="border-border hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full transition-all duration-300 hover:scale-105"
            >
              Switch Persona
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

export default Navbar;
