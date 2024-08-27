import React from 'react';
import Image from 'next/image';

const ValuePropositions: React.FC = () => {
    const propositions = [
      {
        title: "Exclusive Early Access",
        description: "Secure your spot on the waitlist and be among the first to use the app.",
        icon: "/icons/early-access-icon.svg", // replace with actual icon paths
      },
      {
        title: "Level Up with Friends",
        description: "The more friends you invite, the higher your rank – and the sooner you'll get access!",
        icon: "/icons/level-up-icon.svg",
      },
      {
        title: "Unlock Rewards",
        description: "Climb the leaderboard to unlock exclusive rewards, premium features, and more.",
        icon: "/icons/rewards-icon.svg",
      },
    ];
  
    return (
      <section className="py-20 bg-white dark:bg-teal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-teal-900 dark:text-teal-50">Why You&apos;ll Love LookMate</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {propositions.map((prop, index) => (
              <div key={index} className="text-center bg-teal-50 dark:bg-teal-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image src={prop.icon} alt={prop.title} width={64} height={64} className="mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-50 mb-4">{prop.title}</h3>
                <p className="text-teal-700 dark:text-teal-200">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ValuePropositions;