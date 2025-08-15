"use client"

import { motion } from "motion/react"
import { Coffee } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
  isFooterInView: boolean;
}

export default function Footer({ footerRef, isFooterInView }: FooterProps) {
  return (
    <footer ref={footerRef} className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Voice of Dev</span>
            </div>
            <p className="text-muted-foreground">
              Your friendly coding mentor, available 24/7 for guidance and support.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Learn</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/chat" className="block hover:text-foreground transition-colors">JavaScript</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">React</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">System Design</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">Career Tips</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Mentors</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/chat" className="block hover:text-foreground transition-colors">Hitesh Choudhary</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">Piyush Garg</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">More Coming Soon</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/chat" className="block hover:text-foreground transition-colors">Help Center</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">Community</a>
              <a href="/chat" className="block hover:text-foreground transition-colors">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Voice of Dev. Made with ❤️ by <Link href="https://github.com/Rithb898">Rith</Link>.</p>
        </div>
      </motion.div>
    </footer>
  )
}