import React from 'react';

const Features = () => {
    const features = [
      {
        title: "Personalized Outfit Suggestions",
        description: "Get tailored outfit recommendations based on your wardrobe, weather, and mood, ensuring you always step out in style.",
        icon: "/icons/wardrobe-icon.svg"
      },
      {
        title: "Weather-Aware Styling",
        description: "LookMate takes real-time weather conditions into account, so you'll always be prepared, rain or shine.",
        icon: "/icons/weather-icon.svg"
      },
      {
        title: "Occasion-Based Outfits",
        description: "Whether it's a class, a date, or a night out, LookMate suggests outfits perfect for any occasion.",
        icon: "/icons/event-icon.svg"
      },
      {
        title: "Mood Matching",
        description: "Feeling bold or laid-back? Our AI understands your vibe and matches outfits to your mood.",
        icon: "/icons/mood-icon.svg"
      },
      {
        title: "Community Sharing (Coming Soon)",
        description: "Share your outfits, get inspired by others, and engage with a community that loves fashion as much as you do.",
        icon: "/icons/community-icon.svg"
      },
      {
        title: "Quick Wardrobe Upload",
        description: "Easily upload your wardrobe items in seconds and let LookMate do the magic.",
        icon: "/icons/upload-icon.svg"
      }
    ];
  
    return (
      <section className="py-20 bg-white dark:bg-teal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-teal-900 dark:text-teal-50">Why You'll Love LookMate</h2>
            <p className="mt-4 text-lg text-teal-700 dark:text-teal-200">
              Packed with smart features to make your life easier and more stylish.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-teal-50 dark:bg-teal-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-50">{feature.title}</h3>
                <p className="mt-4 text-teal-700 dark:text-teal-200">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#waitlist"
              className="inline-block px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-colors"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;