'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const headings = [
  "Effortless Outfits, Every Day",
  "Your Closet's Best Friend.",
  "AI-Powered Style for Any Occasion.",
  "Get Dressed, Get Noticed."
];

const HeroSection = () => {
  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-midnight-black min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-black to-deep-slate-gray"></div>
      <div className="absolute inset-0 particle-animation"></div>
      <div className="absolute inset-0 wave-animation"></div>
      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 py-24 px-6 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.h1 
            key={currentHeading}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide text-center text-soft-white glow-effect-purple"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {headings[currentHeading]}
          </motion.h1>
        </AnimatePresence>
        <motion.p 
          className="mt-6 text-xl md:text-2xl text-center gradient-text-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          From Class to Night Out – Your AI Stylist Has You Covered
        </motion.p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.a
            href="#trial"
            className="px-10 py-4 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-hover transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Start Your 7-Day Free Trial
          </motion.a>
          <motion.a
            href="#features"
            className="px-10 py-4 bg-gradient-to-r from-vibrant-coral to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-hover transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Explore Premium Features
          </motion.a>
        </div>
        <motion.div 
          className="mt-16 relative w-1/2 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image
            src="/images/hero-image-horizontal.png"
            alt="LookMate app interface on a modern device"
            width={800}
            height={400}
            className="object-cover object-center rounded-lg shadow-2xl"
          />
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-soft-white animate-pulse gradient-text-sub">Scroll to explore</p>
          <svg className="w-6 h-6 mx-auto mt-2 animate-bounce text-electric-cyan" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
