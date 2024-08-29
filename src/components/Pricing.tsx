"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    features: [
      'Limited outfit recommendations',
      'Basic weather integration',
      'Access to standard styles',
      '7-day free trial',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    features: [
      'Unlimited outfit recommendations',
      'Advanced weather integration',
      'Mood & occasion customization',
      'Priority customer support',
      '7-day free trial',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    features: [
      'All Pro Plan features',
      'Early access to new features',
      'Personalized style consultations',
      'Access to exclusive styles and trends',
      '7-day free trial',
    ],
  },
];

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="pricing" className="bg-midnight-black py-24">
      <div className="px-4 mx-auto max-w-7xl lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <motion.h2 
            className="mb-4 text-4xl tracking-tight font-extrabold text-soft-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Perfect Style Plan
          </motion.h2>
          <motion.p 
            className="mb-5 font-light text-soft-white/80 sm:text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevate your wardrobe with our flexible pricing options. From casual dressers to fashion enthusiasts, we&apos;ve got the perfect plan for you.
          </motion.p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mb-16">
          <span className={`mr-3 ${isYearly ? 'text-soft-white/70' : 'text-soft-white'}`}>Monthly</span>
          <motion.div
            className="w-14 h-7 bg-gradient-to-r from-royal-purple to-electric-cyan rounded-full p-1 cursor-pointer"
            onClick={() => setIsYearly(!isYearly)}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-5 h-5 bg-soft-white rounded-full"
              animate={{ x: isYearly ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.div>
          <span className={`ml-3 ${isYearly ? 'text-soft-white' : 'text-soft-white/70'}`}>Yearly</span>
        </div>

        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              whileInView={{ 
                opacity: 1, 
                scale: plan.popular ? 1.05 : 1, 
                y: 0, 
                rotateX: 0 
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1,
                delay: index * 0.1
              }}
              className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow xl:p-8
                ${plan.popular 
                  ? 'lg:scale-105 lg:z-10 relative shadow-2xl border-electric-cyan bg-gradient-to-b from-royal-purple/20 to-midnight-black' 
                  : 'bg-midnight-black border-slate-gray/30'}`}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-electric-cyan text-midnight-black text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Most Popular
                </span>
              )}
              <h3 className={`mb-4 text-2xl font-bold ${plan.popular ? 'text-electric-cyan' : 'text-soft-white'}`}>
                {plan.name}
              </h3>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold text-soft-white">
                  ${isYearly ? plan.yearlyPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                </span>
                <span className="text-xl text-soft-white/80">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <FiCheck className="flex-shrink-0 w-5 h-5 text-electric-cyan" />
                    <span className="text-soft-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                onClick={handleWaitlistClick}
                className={`mt-auto text-soft-white font-medium rounded-lg text-lg px-6 py-3 text-center transition-all duration-300
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-royal-purple to-electric-cyan hover:from-electric-cyan hover:to-royal-purple' 
                    : 'bg-royal-purple hover:bg-royal-purple-dark'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Coming Soon (Join Waitlist)
              </motion.button>
            </motion.div>
          ))}
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
      </div>
    </section>
  );
};

export default Pricing;
