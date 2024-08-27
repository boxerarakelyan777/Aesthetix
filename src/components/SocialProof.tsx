'use client';

import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SocialProof = () => {
  const testimonials = [
    {
      quote: "This app is a game-changer! It saves me so much time every morning. The outfit suggestions are always on point, no matter the weather or occasion.",
      name: "Sarah, College Sophomore",
    },
    {
      quote: "I love how LookMate understands my style. It's like having a personal stylist in my pocket. Highly recommend!",
      name: "Alex, High School Senior",
    },
    {
      quote: "Finally, an app that knows exactly what I want to wear. LookMate has made getting ready for school so much easier.",
      name: "Jordan, College Freshman",
    },
    // Add more testimonials as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-3 h-3 mx-1 bg-slate-gray rounded-full hover:bg-electric-cyan transition-colors duration-300"></div>
    ),
  };

  return (
    <section className="py-20 bg-midnight-black">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-extrabold text-electric-cyan text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Are Saying
        </motion.h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <motion.div 
                className="bg-slate-gray border border-royal-purple rounded-lg shadow-lg p-8 mx-4 hover:shadow-glow transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-lg italic text-soft-white mb-4">&quot;{testimonial.quote}&quot;</p>
                <h3 className="text-xl font-semibold text-electric-cyan">{testimonial.name}</h3>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SocialProof;
