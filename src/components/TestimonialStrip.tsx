"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    review: "This app has completely transformed my wardrobe! I feel so confident now.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike T.",
    review: "As a busy professional, this saves me so much time every morning.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily R.",
    review: "The AI suggestions are spot-on. It's like having a personal stylist!",
    rating: 5,
  },
  {
    id: 4,
    name: "Alex K.",
    review: "I've discovered new outfit combinations I never thought of before.",
    rating: 4,
  },
  {
    id: 5,
    name: "Olivia M.",
    review: "This app has made getting dressed fun again. Highly recommend!",
    rating: 5,
  },
];

const TestimonialStrip: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-midnight-black via-deep-slate-gray to-midnight-black py-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"></div>
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg border border-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/20 hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div>
                <h3 className="text-soft-white font-semibold text-lg">{testimonial.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-emerald-400' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-soft-white text-sm italic">&ldquo;{testimonial.review}&rdquo;</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialStrip;