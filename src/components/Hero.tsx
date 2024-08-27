'use client';

import { useState, useEffect } from 'react';
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
    <section className="relative bg-gradient-to-b from-midnight-black via-deep-slate-gray to-midnight-black min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-electric-cyan mix-blend-screen"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [1, Math.random() * 1.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-electric-cyan/10 to-transparent opacity-30"></div>

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
            whileTap={{ scale: 0.95 }}
          >
            Start Your 7-Day Free Trial
          </motion.a>
          <motion.a
            href="#features"
            className="px-10 py-4 text-soft-white rounded-full text-lg font-semibold transition-all relative"
            style={{
              background: 'transparent',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(to right, #7B2CBF, #00FFFF), linear-gradient(to right, #7B2CBF, #00FFFF)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box',
              boxShadow: '2px 1000px 1px #0D0D0D inset',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Premium Features
          </motion.a>
        </div>
        <motion.div 
          className="mt-16 relative w-3/4 max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="aspect-w-16 aspect-h-9">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            >
              <source src="/images/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
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
