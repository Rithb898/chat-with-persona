import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Sparkles, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Persona } from "@/types";
import { motion } from "motion/react";

function PersonaSelectionOverlay({
  setShowPersonaSelection,
  personas,
  currentPersona,
  switchPersona,
}: {
  setShowPersonaSelection: any;
  personas: { [key: string]: Persona } | Persona[];
  currentPersona: Persona;
  switchPersona: (id: "hitesh" | "piyush") => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={() => setShowPersonaSelection(false)}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="bg-primary/30 animate-particle absolute h-2 w-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="bg-card border-border relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-card-foreground text-3xl font-bold">
            Choose Your AI Companion
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPersonaSelection(false)}
            className="hover:bg-accent cursor-pointer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {Object.values(personas).map((persona) => (
            <Card
              key={persona.id}
              className={`border-border bg-card relative cursor-pointer overflow-hidden p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                currentPersona.id === persona.id
                  ? "ring-primary animate-glow shadow-2xl ring-2"
                  : ""
              }`}
              onClick={() => switchPersona(persona.id)}
            >
              <div className="from-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br opacity-50" />

              <div className="relative z-10 space-y-6 text-center">
                <div className="relative">
                  <Avatar className="animate-float border-primary/20 mx-auto h-24 w-24 border-2 transition-all duration-300 hover:animate-bounce">
                    <AvatarImage
                      src={persona.avatar || "/placeholder.svg"}
                      alt={persona.name}
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                      {persona.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="text-primary h-6 w-6 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                    {persona.name}
                  </h3>
                  <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom mb-4 text-lg duration-700">
                    {persona.tagline}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground px-3 py-1 text-sm"
                  >
                    {persona.dynamicMood
                      ? `${persona.dynamicMood.name} ${persona.dynamicMood.emoji}`
                      : `${persona.mood} ${persona.moodEmoji}`}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {persona.bio}
                </p>

                <div>
                  <p className="text-card-foreground mb-3 text-xs font-medium">
                    Specializes in:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {persona.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-border text-muted-foreground text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PersonaSelectionOverlay;
