"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Coffee, Sparkles } from "lucide-react"

interface CTAProps {
  ctaRef: React.RefObject<HTMLDivElement | null>;
  isCtaInView: boolean;
  onStartChat: () => void;
}

export default function CTA({ ctaRef, isCtaInView, onStartChat }: CTAProps) {
  return (
    <section ref={ctaRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground">
              Ready to Level Up Your Coding Journey?
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Start chatting with your favorite dev mentors today. Get unstuck, build projects, and grow your career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                size="lg"
                onClick={onStartChat}
                className="bg-yellow-600 text-black hover:bg-yellow-700 cursor-pointer px-8 py-4 text-lg rounded-full shadow-xl animate-float"
              >
                Start a conversation <Coffee className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}