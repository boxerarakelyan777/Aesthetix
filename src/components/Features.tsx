"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone, FiSun, FiUsers } from 'react-icons/fi';

const features = [
  {
    title: "Instant Outfit Recommendations",
    description: "Get AI-generated outfit suggestions tailored to your style, occasion, and weather in seconds. Say goodbye to decision fatigue.",
    Icon: FiSmartphone,
  },
  {
    title: "Weather-Based Styling",
    description: "Stay stylish and comfortable with outfits recommended based on real-time weather data, wherever you are.",
    Icon: FiSun,
  },
  {
    title: "Mood & Occasion Customization",
    description: "Customize your outfit choices based on your mood and the occasion. Whether it's a casual hangout or a formal event, LookMate has you covered.",
    Icon: FiUsers,
  },
];

const FeatureBlock = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`flex flex-col md:flex-row items-center mb-20 ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <motion.div 
          className="relative w-48 h-48 md:w-64 md:h-64"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <feature.Icon className="w-full h-full text-electric-cyan" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-purple to-electric-cyan opacity-20 rounded-full" />
        </motion.div>
      </div>
      <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-soft-white mb-4"
          whileHover={{ scale: 1.05 }}
        >
          {feature.title}
        </motion.h3>
        <p className="text-slate-gray text-lg">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="bg-midnight-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-soft-white mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Features That Set Us Apart
        </motion.h2>
        {features.map((feature, index) => (
          <FeatureBlock key={index} feature={feature} index={index} />
        ))}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-soft-white mb-6">
            Ready to revolutionize your wardrobe?
          </h3>
          <motion.a
            href="#signup"
            className="px-8 py-3 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(106, 13, 173, 0.5)' }}
          >
            Start Your Free Trial Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
