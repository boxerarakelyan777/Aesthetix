"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

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
            Choose Your Plan
          </motion.h2>
          <motion.p 
            className="mb-5 font-light text-slate-gray sm:text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select the best plan for your styling needs.
          </motion.p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mb-16">
          <span className={`mr-3 ${isYearly ? 'text-slate-gray' : 'text-soft-white'}`}>Monthly</span>
          <motion.div
            className="w-14 h-7 bg-gradient-to-r from-electric-cyan to-vibrant-coral rounded-full p-1 cursor-pointer"
            onClick={() => setIsYearly(!isYearly)}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-5 h-5 bg-soft-white rounded-full"
              animate={{ x: isYearly ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.div>
          <span className={`ml-3 ${isYearly ? 'text-soft-white' : 'text-slate-gray'}`}>Yearly</span>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`w-full max-w-sm lg:max-w-none lg:w-1/3 flex flex-col p-8 text-center text-soft-white rounded-2xl border shadow-xl
                ${plan.popular 
                  ? 'lg:scale-110 z-10 relative shadow-2xl shadow-electric-cyan/30 border-electric-cyan bg-gradient-to-b from-royal-purple to-midnight-black' 
                  : 'bg-gradient-to-b from-slate-gray to-midnight-black border-slate-gray'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
            >
              {plan.popular && (
                <>
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-electric-cyan text-midnight-black text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                  <div className="absolute inset-0 bg-electric-cyan opacity-10 rounded-2xl blur-[20px] z-[-1]"></div>
                </>
              )}
              <h3 className={`mb-4 text-3xl font-bold ${plan.popular ? 'text-electric-cyan' : ''}`}>
                {plan.name}
              </h3>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-6xl font-extrabold">
                  ${isYearly ? plan.yearlyPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                </span>
                <span className="text-xl text-slate-gray">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <FiCheck className="flex-shrink-0 w-6 h-6 text-electric-cyan" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="#"
                className={`mt-auto text-soft-white font-medium rounded-xl text-lg px-6 py-3 text-center 
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-electric-cyan to-vibrant-coral hover:from-vibrant-coral hover:to-electric-cyan' 
                    : 'bg-royal-purple hover:bg-electric-cyan'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
