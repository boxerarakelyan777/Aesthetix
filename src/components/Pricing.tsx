"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 9.99,
    yearlyPrice: 74.99,
    originalYearlyPrice: 99.99,
    monthlyPriceId: 'price_1PwFnaBfSaHBbUXEeBR6xnD6',
    yearlyPriceId: 'price_1PwGIZBfSaHBbUXEWrusNB8d',
    monthlyPaymentLink: 'https://buy.stripe.com/00g5n12UZeerdcA8wx',
    yearlyPaymentLink: 'https://buy.stripe.com/5kA7v91QV3zN0pOcMU',
    features: [
      'Up to 50 outfit recommendations per month',
      'Ability to upload wardrobe items',
      'Select occasion, mood, and gender for outfit suggestions',
      'Save up to 10 outfits per month',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 19.99,
    yearlyPrice: 149.99,
    originalYearlyPrice: 199.99,
    monthlyPriceId: 'price_1PwFobBfSaHBbUXELuESngLt',
    yearlyPriceId: 'price_1PwGHJBfSaHBbUXEXhr1iRAV',
    monthlyPaymentLink: 'https://buy.stripe.com/eVaaHldzDgmz3C09AD',
    yearlyPaymentLink: 'https://buy.stripe.com/8wMaHl8fjdan4G4dQW',
    features: [
      'Up to 200 outfit recommendations per month',
      'Ability to upload wardrobe items',
      'Select occasion, mood, and gender for outfit suggestions',
      'Save unlimited outfits',
      'Access to priority support',
      'Early access to future features',
      'Advanced features (weather integration, etc.) coming soon',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    monthlyPrice: 29.99,
    yearlyPrice: 224.99,
    originalYearlyPrice: 299.99,
    monthlyPriceId: 'price_1PwFpIBfSaHBbUXEorJ7k99r',
    yearlyPriceId: 'price_1PwGI8BfSaHBbUXEbF42b1iX',
    monthlyPaymentLink: 'https://buy.stripe.com/4gw3eT3Z3fiv1tS7ss',
    yearlyPaymentLink: 'https://buy.stripe.com/dR6bLp7bf6LZ1tS3cj',
    features: [
      'Unlimited outfit recommendations',
      'Ability to upload wardrobe items',
      'Select occasion, mood, and gender for outfit suggestions',
      'Save unlimited outfits',
      'Personalized style consultations (coming soon)',
      'Exclusive access to premium styles and trends (coming soon)',
      'VIP customer support',
      'Access to new features before anyone else',
    ],
  },
];

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleSubscription = (plan: any) => {
    if (!isSignedIn || !user) {
      alert('Please sign in to subscribe');
      return;
    }

    const paymentLink = isYearly ? plan.yearlyPaymentLink : plan.monthlyPaymentLink;
    
    // Construct the URL with query parameters
    const url = new URL(paymentLink);
    
    // Add client_reference_id
    url.searchParams.append('client_reference_id', user.id);
    
    // Add prefilled email if available
    if (user.primaryEmailAddress) {
      url.searchParams.append('prefilled_email', user.primaryEmailAddress.emailAddress);
      // Add parameter to force email collection
      url.searchParams.append('customer_email', user.primaryEmailAddress.emailAddress);
    }

    // Redirect to the constructed URL
    window.location.href = url.toString();
  };

  const calculateMonthlyDiscountedPrice = (price: number) => {
    return (price * 0.6).toFixed(2); // 40% discount for monthly plans
  };

  const calculateYearlySavings = (originalPrice: number, discountedPrice: number) => {
    return (originalPrice - discountedPrice).toFixed(2);
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
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
            Join the waitlist now and get a 40% discount on any plan!
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
          <span className={`ml-3 ${isYearly ? 'text-soft-white' : 'text-soft-white/70'}`}>Yearly (25% off)</span>
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
              <div className="flex flex-col items-center my-8">
                <span className="text-5xl font-extrabold text-soft-white">
                  ${isYearly ? plan.yearlyPrice.toFixed(2) : calculateMonthlyDiscountedPrice(plan.monthlyPrice)}
                </span>
                <span className="text-xl text-soft-white/80">/{isYearly ? 'year' : 'month'}</span>
                {isYearly ? (
                  <>
                    <span className="mt-2 text-electric-cyan line-through">
                      ${plan.originalYearlyPrice.toFixed(2)}
                    </span>
                    <span className="text-electric-cyan text-sm">
                      Save ${calculateYearlySavings(plan.originalYearlyPrice, plan.yearlyPrice)} per year
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mt-2 text-electric-cyan line-through">
                      ${plan.monthlyPrice.toFixed(2)}
                    </span>
                    <span className="text-electric-cyan text-sm">40% off with waitlist</span>
                  </>
                )}
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
                onClick={() => handleSubscription(plan)}
                className={`mt-auto text-soft-white font-medium rounded-lg text-lg px-6 py-3 text-center transition-all duration-300
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-royal-purple to-electric-cyan hover:from-electric-cyan hover:to-royal-purple' 
                    : 'bg-royal-purple hover:bg-royal-purple-dark'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
