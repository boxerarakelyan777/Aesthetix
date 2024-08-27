"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiSmartphone, FiSun, FiUsers, FiHeart, FiAward } from 'react-icons/fi';

const features = [
  {
    title: "Instant Outfit Recommendations Tailored Just for You",
    description: "Say goodbye to the morning struggle of what to wear. With LookMate, your perfect outfit is just a tap away. Our AI scans your wardrobe and delivers stylish, personalized outfit suggestions in seconds. Whether you're heading to class or meeting friends, you'll always look your best—effortlessly. Never waste time wondering what to wear again—let LookMate do the thinking for you.",
    image: '/images/image.png',
  },
  {
    title: "Stay Stylish, No Matter the Weather",
    description: "Rain, shine, or snow—LookMate has you covered. Our advanced weather integration ensures your outfit not only looks great but also keeps you comfortable in any condition. Heading out on a chilly day? We'll suggest the coziest layers. Facing a hot afternoon? Stay cool with a fresh, breathable ensemble. LookMate's weather-aware suggestions mean you'll never be caught off guard.",
    image: '/images/image1.png',
  },
  {
    title: "Dress for Every Mood and Occasion with Confidence",
    description: "Whether you're feeling laid-back, bold, or somewhere in between, LookMate adjusts to your vibe. Simply set your mood or select the occasion, and our AI will craft the perfect outfit to match. From casual hangouts to important events, LookMate ensures your look always fits the moment, boosting your confidence and letting your personality shine through your style.",
    image: '/images/image3.png',
  },
  {
    title: "Effortless Style, Every Day—Powered by AI",
    description: "Imagine waking up every day knowing that your perfect outfit is already picked out for you. LookMate's AI does just that—making daily styling easy and stress-free. No more endless wardrobe changes or second-guessing your look. With LookMate, you get outfits that are not just stylish but also perfectly suited to your day. It's like having a personal stylist in your pocket.",
    image: '/images/image2.png',
  },
  {
    title: "Share Your Style, Inspire Others, and Be Inspired",
    description: "LookMate isn't just about looking good—it's about connecting with a community that shares your passion for fashion. Share your outfits, get feedback, and discover new trends by connecting with like-minded fashion lovers. Rank up by participating in style challenges and see where you stand in the community. With LookMate, fashion becomes a shared experience.",
    image: '/images/image4.png',
  },
];

const FeatureBlock = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`flex flex-col md:flex-row items-center mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        {feature.image ? (
          <motion.div 
            className="relative w-full h-auto max-w-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={600}
              height={450}
              className="object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <feature.Icon className="w-full h-full text-electric-cyan" />
          </motion.div>
        )}
      </div>
      <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-soft-white mb-4"
          whileHover={{ scale: 1.05 }}
        >
          {feature.title}
        </motion.h3>
        <p className="text-soft-white text-lg opacity-80">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="bg-midnight-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-soft-white mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Features That Set Us Apart
        </motion.h2>
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <FeatureBlock feature={feature} index={index} />
            {index < features.length - 1 && (
              <div className="w-1/3 mx-auto border-b border-electric-cyan opacity-20 mb-32" />
            )}
          </React.Fragment>
        ))}
        <motion.div 
          className="text-center mt-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-soft-white mb-6">
            Ready to elevate your style game?
          </h3>
          <p className="text-soft-white text-lg mb-8">
            Start your free trial with LookMate and experience the future of fashion today.
          </p>
          <motion.a
            href="#signup"
            className="px-8 py-3 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(106, 13, 173, 0.5)' }}
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
