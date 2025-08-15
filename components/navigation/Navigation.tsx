"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"

interface NavigationProps {
  onStartChat: () => void
}

export default function Navigation({ onStartChat }: NavigationProps) {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Coffee className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Voice of Dev</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#mentors" className="text-muted-foreground hover:text-foreground transition-colors">
              Mentors
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onStartChat}
              className="bg-yellow-600 text-black hover:bg-yellow-700 cursor-pointer"
            >
              Start a conversation
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}