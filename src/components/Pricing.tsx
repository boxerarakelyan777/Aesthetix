'use client';

import React from 'react';

// Stripe Plans
const plans = [
  {
    name: 'Free',
    price: 0,
    link: '#',
    features: [
      '5 flashcard generations per month',
      '2 saved flashcard sets',
      'No access to flashcard games',
    ],
  },
  {
    name: 'Basic',
    price: 9.99,
    link: 'https://buy.stripe.com/test_8wM3eb0eY8O15b2aEG',
    priceId: 'price_1PqSRUBGuZJEG2quYl0LPh29',
    features: [
      'Unlimited text to flashcard generations',
      '200 document to flashcard generations per month',
      'Unlimited saved flashcard sets',
      'Access to basic flashcard games',
    ],
  },
  {
    name: 'Pro',
    price: 19.99,
    link: 'https://buy.stripe.com/test_eVabKH8LufcpcDu003',
    priceId: 'price_1PqSY0BGuZJEG2quz5Ixehbc',
    features: [
      'Unlimited text to flashcard generations',
      'Unlimited document to flashcard generations',
      'Unlimited saved flashcard sets',
      'Access to all flashcard games',
    ],
  },
];

const Pricing: React.FC = () => {
  const getButtonLink = (plan: { price: number; link: string }) => {
    if (plan.price === 0) return '#';
    return plan.link;
  };

  return (
    <section id="pricing" className="bg-teal-50 dark:bg-teal-900">
      <div className="px-4 py-24 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-teal-900 dark:text-teal-50">
            Choose the Best Plan for Your Learning Journey
          </h2>
          <p className="mb-5 font-light text-teal-700 sm:text-xl dark:text-teal-200">
            Explore our flexible pricing plans to suit your study needs. Whether you&apos;re a solo learner or a team, we&apos;ve got you covered.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-6 mx-auto max-w-lg text-center text-teal-900 bg-white rounded-lg border border-teal-200 shadow dark:border-teal-600 xl:p-8 dark:bg-teal-800 dark:text-teal-50
                ${plan.name === 'Basic' ? 'lg:scale-110 lg:z-10 relative shadow-lg dark:shadow-yellow-500/50 shadow-yellow-500/50 border-yellow-500' : ''}`}
            >
              {plan.name === 'Basic' && (
                <>
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-teal-900 text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                  <div className="absolute inset-0 bg-yellow-200 dark:bg-yellow-900 opacity-20 rounded-lg blur-[20px] z-[-1]"></div>
                </>
              )}
              <h3 className={`mb-4 text-2xl font-semibold ${plan.name === 'Basic' ? 'text-yellow-600 dark:text-yellow-400' : ''}`}>
                {plan.name}
              </h3>
              <p className="font-light text-teal-700 sm:text-lg dark:text-teal-200">
                {plan.name === 'Free' 
                  ? 'Ideal for personal use to explore the features.' 
                  : plan.name === 'Pro' 
                    ? 'Best for advanced users who need more features.' 
                    : 'Perfect for individual learners and small study groups.'}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${plan.price}</span>
                <span className="text-teal-700 dark:text-teal-200">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-teal-500 dark:text-teal-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={getButtonLink(plan)}
                  target="_blank"
                  className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-teal-900"
                >
                  {plan.price === 0 ? 'Subscribe' : 'Subscribe'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
