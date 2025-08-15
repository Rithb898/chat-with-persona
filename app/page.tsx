"use client";

import { useInView, useScroll, useTransform } from "motion/react";
import React, { useRef, useState } from "react";
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Features from "@/components/sections/Features";
import Mentors from "@/components/sections/Mentors";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import ChatModal from "@/components/sections/ChatModal";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  const [showChatDemo] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const mentorsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 750], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 750], [1, 0.8]);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isMentorsInView = useInView(mentorsRef, { once: true, margin: "-100px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const isFooterInView = useInView(footerRef, { once: true, margin: "-100px" });

  const onStartChat = () => {
    router.push("/chat");
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navigation onStartChat={onStartChat} />
      <HeroSection
        heroRef={heroRef}
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        isHeroInView={isHeroInView}
        onStartChat={onStartChat}
      />
      <Features featuresRef={featuresRef} isFeaturesInView={isFeaturesInView} />
      <Mentors mentorsRef={mentorsRef} isMentorsInView={isMentorsInView} onStartChat={onStartChat} />
      <Testimonials testimonialsRef={testimonialsRef} isTestimonialsInView={isTestimonialsInView} />
      <CTA ctaRef={ctaRef} isCtaInView={isCtaInView} onStartChat={onStartChat} />
      <Footer footerRef={footerRef} isFooterInView={isFooterInView} />
      <ChatModal showChatDemo={showChatDemo} onClose={onStartChat} />
    </div>
  );
}

export default HomePage;
