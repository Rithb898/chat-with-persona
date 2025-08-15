"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { personas } from "@/hooks/useChat"


interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement | null>
  heroOpacity: import("motion/react").MotionValue<number>
  heroScale: import("motion/react").MotionValue<number>
  isHeroInView: boolean
  onStartChat: () => void
}

export default function HeroSection({
  heroRef,
  heroOpacity,
  heroScale,
  isHeroInView,
  onStartChat,
}: HeroSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      ref={heroRef}
      className="relative py-44 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate={isHeroInView ? "animate" : "initial"}
        >
          <motion.div variants={fadeInUp} className="space-y-4" transition={{ duration: 0.6, ease: "easeOut" }}>
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/50 text-primary">
              ☕ Your friendly coding mentor, 24/7
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Voice of Dev —
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your friendly coding mentor, 24/7
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Chat with expert dev personas for debugging, project help, and career tips — build faster, learn
              smarter.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center" transition={{ duration: 0.6, ease: "easeOut" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={onStartChat}
                className="bg-yellow-600 text-black hover:bg-yellow-700 px-8 py-4 text-lg rounded-full shadow-lg cursor-pointer"
              >
                Start a conversation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center items-center space-x-7 pt-8 mx-auto" transition={{ duration: 0.6, ease: "easeOut" }}>
            {Object.values(personas).map((persona) => (
              <motion.div
                key={persona.id}
                className="text-center space-y-3"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative">
                  <Avatar className="h-20 w-20 mx-auto border-4 border-primary/20 shadow-xl">
                    <AvatarImage src={persona.avatar || "/placeholder.svg"} alt={persona.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {persona.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{persona.name.split(" ")[0]}</h3>
                  <p className="text-sm text-muted-foreground">{persona.mood}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}