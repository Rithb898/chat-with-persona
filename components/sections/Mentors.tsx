"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

import { useChat } from "@/hooks/useChat";

interface MentorsProps {
  mentorsRef: React.RefObject<HTMLDivElement | null>;
  isMentorsInView: boolean;
  onStartChat: () => void;
}

export default function Mentors({ mentorsRef, isMentorsInView, onStartChat }: MentorsProps) {
  const { personas } = useChat();
  return (
    <section
      ref={mentorsRef}
      id="mentors"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="from-primary/5 via-background to-accent/5 absolute inset-0 bg-gradient-to-br" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-primary/25 absolute h-2 w-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            animate={{
              y: [-10, -60],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isMentorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="text-primary h-6 w-6 animate-pulse" />
            </motion.div>
            <h2 className="text-card-foreground text-3xl font-bold sm:text-4xl">
              Meet Your Dev Mentors
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            Learn from India&apos;s most loved coding educators who&apos;ve helped
            thousands of developers succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {Object.values(personas).map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={isMentorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-card border-border group relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <div
                  className={`h-2 bg-gradient-to-r ${persona.id === "hitesh" ? "from-orange-500 to-amber-600" : "from-blue-500 to-indigo-600"}`}
                />
                <div className="from-accent/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-30" />
                <CardContent className="relative z-10 space-y-6 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Avatar className="border-primary/20 animate-float h-16 w-16 border-4 shadow-xl">
                          <AvatarImage
                            src={persona.avatar || "/placeholder.svg"}
                            alt={persona.name}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                            {persona.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="text-primary h-4 w-4 animate-pulse" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-card-foreground text-2xl font-bold">
                        {persona.name}
                      </h3>
                      <p className="text-accent font-medium">
                        {persona.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {persona.bio}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold tracking-wide uppercase">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.skills.slice(0, 7).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-secondary/50 text-secondary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      className="w-full cursor-pointer bg-yellow-600 text-black shadow-lg hover:bg-yellow-700"
                      onClick={() => {
                        localStorage.setItem("selectedPersona", persona.id);
                        onStartChat();
                      }}
                    >
                      Chat with {persona.name.split(" ")[0]}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
