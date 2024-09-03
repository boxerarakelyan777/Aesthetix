'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  runTransaction,
  increment,
  query, 
  onSnapshot, 
  Timestamp,
  getDoc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { FaTwitter, FaFacebook, FaInstagram, FaTiktok, FaDiscord, FaLinkedin, FaSnapchatGhost } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import dynamic from 'next/dynamic';

const DynamicSocialShare = dynamic(() => import('./SocialShare'), { ssr: false });

const headings = [
  "Effortless Outfits, Every Day",
  "Your Closet's Best Friend",
  "AI-Powered Style for Any Occasion",
  "Get Dressed, Get Noticed"
];

const MAX_REFERRAL_DISCOUNT = 5;
const REFERRAL_DISCOUNT_INCREMENT = 0.1;

const HeroSection = () => {
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState<number>(1000);
  const [hours, setHours] = useState(72);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [inputReferralCode, setInputReferralCode] = useState<string>('');
  const [endTime, setEndTime] = useState<Timestamp | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const waitlistQuery = query(collection(db, 'waitlist'));
    const unsubscribe = onSnapshot(waitlistQuery, (snapshot) => {
      const waitlistCount = snapshot.size;
      const remainingSpots = Math.max(0, 1000 - waitlistCount);
      setSpotsLeft(remainingSpots);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEndTime = async () => {
      const endTimeDoc = await getDoc(doc(db, 'config', 'timerConfig'));
      if (endTimeDoc.exists()) {
        setEndTime(endTimeDoc.data().endTime);
      } else {
        const newEndTime = Timestamp.fromDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
        await setDoc(doc(db, 'config', 'timerConfig'), { endTime: newEndTime });
        setEndTime(newEndTime);
      }
    };
    fetchEndTime();
  }, []);

  useEffect(() => {
    if (!endTime) return;

    const calculateTimeLeft = () => {
      const now = Timestamp.now();
      const timeLeft = endTime.seconds - now.seconds;

      if (timeLeft <= 0) {
        setIsExpired(true);
        return;
      }

      setHours(Math.floor(timeLeft / 3600));
      setMinutes(Math.floor((timeLeft % 3600) / 60));
      setSeconds(timeLeft % 60);
    };

    calculateTimeLeft();
    const timerInterval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerInterval);
  }, [endTime]);

  const generateReferralCode = useCallback((name: string) => {
    return `${name.toLowerCase().replace(/\s+/g, '')}-${Math.random().toString(36).substr(2, 6)}`;
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

      const newReferralCode = generateReferralCode(name);
      setReferralCode(newReferralCode);

      await runTransaction(db, async (transaction) => {
        // Perform all reads first
        const counterDocRef = doc(db, 'counters', 'signupCounter');
        const counterDoc = await transaction.get(counterDocRef);
        
        let referrerData = null;
        if (inputReferralCode) {
          const referrerDocRef = doc(db, 'waitlist', inputReferralCode);
          const referrerDoc = await transaction.get(referrerDocRef);
          if (referrerDoc.exists()) {
            referrerData = referrerDoc.data();
          }
        }

        // Now perform all writes
        let newCount = 1;
        if (counterDoc.exists()) {
          newCount = (counterDoc.data().signupsCount || 0) + 1;
        }
        transaction.set(counterDocRef, { signupsCount: newCount }, { merge: true });

        let baseDiscount = spotsLeft > 0 ? 40 : 0;
        let additionalDiscount = 0;

        if (referrerData) {
          // Update referrer's discount
          const currentReferrals = referrerData.referrals || 0;
          const newReferrals = currentReferrals + 1;
          const newReferrerDiscount = Math.min(
            (referrerData.referralDiscount || 0) + REFERRAL_DISCOUNT_INCREMENT,
            MAX_REFERRAL_DISCOUNT
          );
          
          transaction.update(doc(db, 'waitlist', inputReferralCode), { 
            referrals: newReferrals,
            referralDiscount: newReferrerDiscount
          });

          // Set additional discount for the new user
          additionalDiscount = REFERRAL_DISCOUNT_INCREMENT;

          // Add referral relationship
          transaction.set(doc(db, 'referrals', newReferralCode), {
            referredBy: inputReferralCode,
            timestamp: serverTimestamp()
          });
        }

        const userDocRef = doc(collection(db, 'waitlist'), newReferralCode);
        transaction.set(userDocRef, {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          referralCode: newReferralCode,
          baseDiscount: baseDiscount,
          referralDiscount: additionalDiscount,
          totalDiscount: baseDiscount + additionalDiscount,
          referrals: 0,
          timestamp: serverTimestamp()
        });
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
          <span>Referral code copied to clipboard!</span>
        </div>
      `;
      notification.className = 'fixed bottom-4 left-4 bg-deep-slate-gray text-electric-cyan px-4 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-out translate-y-full';
      notification.style.boxShadow = '0 4px 6px rgba(0, 255, 255, 0.1), 0 0 0 1px rgba(0, 255, 255, 0.1)';
      document.body.appendChild(notification);
      
      // Trigger the animation after a short delay
      setTimeout(() => {
        notification.style.transform = 'translateY(0)';
      }, 10);

      setTimeout(() => {
        notification.style.transform = 'translateY(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    });
  };

  const shareMessage = `Join the waitlist for LookMate and get a 40% discount! Use my referral code: ${referralCode}`;

  const socialShareLinks = [
    { icon: <FaTwitter />, name: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank') },
    { icon: <FaFacebook />, name: 'Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&quote=${encodeURIComponent(shareMessage)}`, '_blank') },
    { icon: <FaInstagram />, name: 'Instagram', action: () => window.open('https://instagram.com/', '_blank') },
    { icon: <FaTiktok />, name: 'TikTok', action: () => window.open('https://www.tiktok.com/', '_blank') },
    { icon: <FaDiscord />, name: 'Discord', action: () => window.open('https://discord.com/', '_blank') },
    { icon: <FaLinkedin />, name: 'LinkedIn', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank') },
    { icon: <RiMessage2Fill />, name: 'Messages', action: () => window.open(`sms:&body=${encodeURIComponent(shareMessage)}`, '_blank') },
    { icon: <FaSnapchatGhost />, name: 'Snapchat', action: () => window.open('https://www.snapchat.com/', '_blank') },
  ];

  return (
    <section id="hero" className="relative bg-gradient-to-b from-midnight-black via-deep-slate-gray to-midnight-black min-h-screen overflow-hidden">
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
        <div className={`${isMobile ? 'h-[120px] md:h-auto' : ''} flex items-center mb-6`}>
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

        {/* New prominent discount and timer section */}
        <motion.div 
          className="w-full max-w-4xl bg-deep-slate-gray/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-electric-cyan/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-3xl font-bold text-electric-cyan mb-2">
                Only {spotsLeft} spots left
              </h3>
              <p className="text-soft-white text-xl">
                for the 40% discount!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <TimeUnit value={hours} label="Hours" max={72} />
              <TimeUnit value={minutes} label="Minutes" max={60} />
              <TimeUnit value={seconds} label="Seconds" max={60} />
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
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
                  <div>
                    <label htmlFor="referralCode" className="block text-sm font-medium text-soft-white mb-1">Referral Code (Optional)</label>
                    <input
                      id="referralCode"
                      type="text"
                      value={inputReferralCode}
                      onChange={(e) => setInputReferralCode(e.target.value)}
                      placeholder="Enter referral code"
                      className="w-full p-3 bg-midnight-black border border-electric-cyan/30 rounded-lg focus:outline-none focus:border-electric-cyan transition-colors text-soft-white"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Secure Your Spot'}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4 text-electric-cyan">Welcome aboard, {name}!</h3>
                  <p className="text-soft-white mb-6">You have successfully joined our exclusive waitlist.</p>
                  <div className="bg-midnight-black p-4 rounded-lg mb-4">
                    <p className="text-soft-white mb-2">Your referral code:</p>
                    <p className="text-electric-cyan font-bold text-lg mb-2">{referralCode}</p>
                    <button 
                      onClick={copyToClipboard}
                      className="bg-electric-cyan text-midnight-black px-4 py-2 rounded-full hover:bg-royal-purple hover:text-soft-white transition-colors"
                    >
                      Copy Code
                    </button>
                  </div>
                  <p className="text-soft-white mb-4">Share this code with friends to earn additional discounts!</p>
                  <DynamicSocialShare socialShareLinks={socialShareLinks} />
                </div>
              )}
              {/* eslint-disable-next-line react/no-unescaped-entities */}
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

const TimeUnit = ({ value, label, max }: { value: number; label: string; max: number }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 mb-2">
      <CircularProgressbar
        value={(value / max) * 100}
        text={`${value}`}
        styles={buildStyles({
          textColor: '#00FFFF',
          pathColor: '#00FFFF',
          trailColor: '#1E293B',
          textSize: '24px',
        })}
      />
    </div>
    <span className="text-soft-white text-sm">{label}</span>
  </div>
);

export default HeroSection;
