import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Persona } from "@/types";

function TypingIndicator({currentPersona}: {currentPersona: Persona}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center space-x-2 p-4 duration-300">
      <Avatar className="animate-float h-8 w-8">
        <AvatarImage
          src={currentPersona.avatar || "/placeholder.svg"}
          alt={currentPersona.name}
        />
        <AvatarFallback className="bg-card text-card-foreground">
          {currentPersona.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex space-x-1">
        <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
        <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
        <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
      </div>
      <span className="text-muted-foreground text-xs">
        {currentPersona.name} is typing...
      </span>
    </div>
  );
}

export default TypingIndicator;
