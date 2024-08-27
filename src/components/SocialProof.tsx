'use client';

import React from 'react';
import Slider from 'react-slick';
import { useSpring, animated } from 'react-spring';

const SocialProof = () => {
  const testimonials = [
    {
      quote: "This app is a game-changer! It saves me so much time every morning. The outfit suggestions are always on point, no matter the weather or occasion.",
      name: "Sarah, College Sophomore",
      image: "/testimonials/sarah.jpg"
    },
    {
      quote: "I love how LookMate understands my style. It’s like having a personal stylist in my pocket. Highly recommend!",
      name: "Alex, High School Senior",
      image: "/testimonials/alex.jpg"
    },
    {
      quote: "Finally, an app that knows exactly what I want to wear. LookMate has made getting ready for school so much easier.",
      name: "Jordan, College Freshman",
      image: "/testimonials/jordan.jpg"
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
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <section className="bg-teal-50 py-20 dark:bg-teal-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-teal-900 dark:text-teal-50">What Our Users Are Saying</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <animated.div className="bg-white dark:bg-teal-800 rounded-lg shadow-lg p-8 mx-4 transition-transform duration-500 ease-in-out transform hover:scale-105">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                <p className="text-lg italic text-teal-900 dark:text-teal-100 mb-4">"{testimonial.quote}"</p>
                <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300">{testimonial.name}</h3>
              </animated.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SocialProof;
