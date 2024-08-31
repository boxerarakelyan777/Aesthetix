'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const headings = [
  "Effortless Outfits, Every Day",
  "Your Closet's Best Friend",
  "AI-Powered Style for Any Occasion",
  "Get Dressed, Get Noticed"
];

const HeroSection = () => {
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlistClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!name.trim() || !email.trim()) {
        throw new Error('Name and email are required');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }

      await addDoc(collection(db, 'waitlist'), {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        timestamp: serverTimestamp()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 800], [5, 0]);
  const translateY = useTransform(scrollY, [0, 800], ['5%', '0%']);
  const scale = useTransform(scrollY, [0, 800], [0.9, 1]);
  const opacity = useTransform(scrollY, [0, 800], [0.8, 1]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

      {/* Updated static glow effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="w-[60%] aspect-square rounded-full bg-gradient-radial from-electric-cyan/20 via-electric-cyan/5 to-transparent"
          style={{
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 py-24 px-6 min-h-screen">
        <div className={`${isMobile ? 'h-[120px] md:h-auto' : ''} flex items-center`}>
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
          className="mt-6 text-xl md:text-2xl text-center gradient-text-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          From Class to Night Out – Your AI Stylist Has You Covered
        </motion.p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.button
            onClick={handleWaitlistClick}
            className="px-10 py-4 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-hover transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Waitlist
          </motion.button>
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
          className="mt-16 relative w-full max-w-7xl overflow-visible"
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
                            {/* Commented out video */}
              {/*
              <video
                id="hero-video"
                autoPlay={!isMobile}
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              >
                <source src="/images/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
              
              {/* Added image */}
              {/* Added image with contain object-fit */}
              <img
                src="/images/HeroSection.png" // Replace with your actual image path
                alt="AI-powered styling"
                className="w-full h-full object-contain object-center bg-midnight-black"
              />

              {/* Remove or comment out the mobile play button logic */}
              {/*
              {isMobile && !isPlaying && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                >
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              */}
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

      {/* Waitlist Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-deep-slate-gray text-soft-white rounded-2xl p-8 max-w-lg w-full mx-auto shadow-2xl border border-electric-cyan/30"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-sub">Join the Waitlist</h2>
                <button onClick={handleCloseModal} className="text-soft-white hover:text-electric-cyan transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-soft-white mb-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-3 bg-midnight-black border border-electric-cyan/30 rounded-lg focus:outline-none focus:border-electric-cyan transition-colors text-soft-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-soft-white mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 bg-midnight-black border border-electric-cyan/30 rounded-lg focus:outline-none focus:border-electric-cyan transition-colors text-soft-white"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Secure Your Spot'}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-semibold mb-4 text-soft-white">Welcome aboard, {name}!</p>
                  <p className="text-electric-cyan mb-6">You&apos;ve successfully joined our exclusive waitlist.</p>
                </div>
              )}
              <p className="mt-6 text-xs text-soft-white text-center">
                By joining, you agree to our <a href="#" className="text-electric-cyan hover:underline">Privacy Policy</a> and <a href="#" className="text-electric-cyan hover:underline">Terms of Service</a>.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="w-256 h-256 rounded-full bg-electric-cyan opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
