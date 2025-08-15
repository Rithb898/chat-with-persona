"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Sparkles } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    content: "Hitesh bhai ne mujhe React sikhaya chai ke saath. Ab main confident feel karta hun interviews mein!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Full Stack Developer",
    content: "Piyush sir's system design explanations are amazing. Got my dream job at a startup thanks to his guidance!",
    rating: 5,
  },
  {
    name: "Arjun Singh",
    role: "Software Engineer",
    content: "Tutorial hell se nikalne mein Voice of Dev ne bahut help ki. Real projects banane ka confidence mila.",
    rating: 5,
  },
]

interface TestimonialsProps {
  testimonialsRef: React.RefObject<HTMLDivElement | null>;
  isTestimonialsInView: boolean;
}

export default function Testimonials({ testimonialsRef, isTestimonialsInView }: TestimonialsProps) {
  return (
    <section ref={testimonialsRef} id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
            animate={{
              y: [-10, -50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground">Success Stories</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who&apos;ve accelerated their careers with Voice of Dev.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full bg-card border-border hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                <div className="from-accent/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-40" />
                <CardContent className="relative z-10 p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-600 text-yellow-600 animate-pulse" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">&quot;{testimonial.content}&quot;</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}