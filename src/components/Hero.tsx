'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const headings = [
  "Effortless Outfits, Every Day",
  "Your Closet's Best Friend",
  "AI-Powered Style for Any Occasion",
  "Get Dressed, Get Noticed"
];

const HeroSection = () => {
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 800], [5, 0]);
  const translateY = useTransform(scrollY, [0, 800], ['5%', '0%']);
  const scale = useTransform(scrollY, [0, 800], [0.9, 1]);
  const opacity = useTransform(scrollY, [0, 800], [0.8, 1]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-b from-midnight-black via-deep-slate-gray to-midnight-black min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {isClient && [...Array(100)].map((_, i) => (
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

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="w-[60%] aspect-square rounded-full bg-gradient-radial from-electric-cyan/20 via-electric-cyan/5 to-transparent"
          style={{
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 py-24 px-6 min-h-screen">
        <div className="flex items-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentHeading}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-wide text-center text-soft-white glow-effect-purple"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {headings[currentHeading]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <motion.p 
          className="mt-6 text-xl md:text-2xl text-center gradient-text-sub mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          From Class to Night Out – Your AI Stylist Has You Covered
        </motion.p>

        {/* Updated discount message */}
        <motion.div 
          className="mb-8 bg-electric-cyan/10 backdrop-blur-md rounded-full px-6 py-3 border border-electric-cyan/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-electric-cyan text-lg font-semibold">
            First 1000 users get 40% off their first month!
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-hover transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <motion.button
              onClick={scrollToPricing}
              className="px-10 py-4 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-hover transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </SignedIn>
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
          className="mt-1 relative w-full max-w-7.5xl overflow-visible"
          style={{
            perspective: '1000px',
            perspectiveOrigin: 'center top',
          }}
        >
          <motion.div
            className="w-full aspect-video"
            style={{
              rotateX,
              translateY,
              scale,
              opacity,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <div 
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{
                boxShadow: '0 20px 50px -10px rgba(0, 255, 255, 0.3)',
              }}
            >
              <Image
                src="/images/HeroSection.png"
                alt="AI-powered styling"
                fill
                style={{ objectFit: 'contain' }}
                className="bg-midnight-black"
              />
            </div>
          </motion.div>
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

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="w-256 h-256 rounded-full bg-electric-cyan opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
