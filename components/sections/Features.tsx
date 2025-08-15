"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Coffee,
  Code,
  BookOpen,
  Users,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Learn with Chai Breaks",
    description:
      "Friendly, conversational learning that feels like chatting with a coding buddy over chai.",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description:
      "Build real projects while learning. No more tutorial hell - create portfolio-worthy applications.",
  },
  {
    icon: BookOpen,
    title: "Hinglish Explanations",
    description:
      "Complex concepts explained in simple Hinglish that Indian developers love and understand.",
  },
  {
    icon: Users,
    title: "Career Mentorship",
    description:
      "Get guidance on job hunting, interviews, salary negotiations, and career growth in tech.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "Debug code, understand errors, and learn best practices from experienced mentors.",
  },
  {
    icon: Target,
    title: "Goal-Oriented Learning",
    description:
      "Set learning goals and get personalized roadmaps to achieve them efficiently.",
  },
];

interface FeaturesProps {
  featuresRef: React.RefObject<HTMLDivElement | null>;
  isFeaturesInView: boolean;
}

export default function Features({
  featuresRef,
  isFeaturesInView,
}: FeaturesProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      ref={featuresRef}
      id="features"
      className="bg-card/30 relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="from-primary/5 via-background to-accent/5 absolute inset-0 bg-gradient-to-br" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-primary/20 absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
            animate={{
              y: [-15, -80],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-16 space-y-4 text-center"
          variants={fadeInUp}
          initial="initial"
          animate={isFeaturesInView ? "animate" : "initial"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="text-primary h-6 w-6 animate-pulse" />
            </motion.div>
            <h2 className="text-card-foreground text-3xl font-bold sm:text-4xl">
              Why Developers Love Us
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            Learn coding the Indian way - with chai, practical projects, and
            mentors who understand your journey.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          animate={isFeaturesInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <Card className="bg-card border-border group relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <div className="from-accent/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-50" />
                <CardContent className="relative z-10 space-y-4 p-6">
                  <motion.div
                    className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: 10, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <feature.icon className="text-primary h-6 w-6 animate-pulse" />
                  </motion.div>
                  <h3 className="text-card-foreground text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
