"use client"

import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"

interface ChatModalProps {
  showChatDemo: boolean
  onClose: () => void
}

export default function ChatModal({ showChatDemo, onClose }: ChatModalProps) {
  return (
    <AnimatePresence>
      {showChatDemo && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
            className="bg-card border-border relative z-10 rounded-3xl border p-8 max-w-md w-full text-center space-y-6 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="from-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br opacity-50 rounded-3xl" />
            <div className="relative z-10 space-y-6">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-card-foreground">Chai Break!</h3>
              <p className="text-muted-foreground leading-relaxed">
                The interactive chat with Hitesh and Piyush is brewing! Sign up to be the first to chat with your
                favorite dev mentors.
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer transition-all hover:scale-105"
                  onClick={onClose}
                >
                  Notify Me When Ready
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-border hover:bg-card cursor-pointer transition-all hover:scale-105"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}