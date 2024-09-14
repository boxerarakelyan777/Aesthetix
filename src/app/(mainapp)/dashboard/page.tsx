import React from 'react';
import { FiGrid, FiStar, FiCalendar } from 'react-icons/fi';
import { LiaTshirtSolid } from "react-icons/lia";
import { BiCloset } from "react-icons/bi";
import { IconType } from 'react-icons';

interface DashboardCardProps {
  title: string;
  icon: IconType;
  description: string;
  linkText: string;
  linkHref: string;
}

const DashboardPage = () => {
  return (
    <div className="space-y-8 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-electric-cyan mb-4 shadow-lg">Welcome to Your Dashboard</h1>
    
{
  /* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <SummaryCard title="Total Outfits" value="42" />
    <SummaryCard title="Wardrobe Items" value="156" />
    <SummaryCard title="Upcoming Events" value="3" />
  </div> */
}
        
        
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Quick Outfit"
          icon={LiaTshirtSolid}
          description="Generate a new outfit based on your mood and the weather."
          linkText="Create Outfit"
          linkHref="/outfit-generator"
        />
        <DashboardCard
          title="Your Wardrobe"
          icon={BiCloset}
          description="Manage and organize your wardrobe items."
          linkText="View Wardrobe"
          linkHref="/wardrobe"
        />
        <DashboardCard
          title="Saved Outfits"
          icon={FiStar}
          description="View and manage your favorite saved outfits."
          linkText="View Saved"
          linkHref="/saved-outfits"
        />
      </section>
{/*
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOutfits />
        <UpcomingEvents />
      </section>

      <section className="bg-slate-gray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Daily Fashion Tip</h2>
        <p className="text-soft-white/80">Mix patterns like a pro: Pair a striped shirt with floral pants for a bold, fashion-forward look.</p>
      </section>

      */}
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon: Icon, description, linkText, linkHref }) => {
  return (
    <div className="bg-slate-gray rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-electric-cyan mr-2" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-soft-white/80 mb-4">{description}</p>
      <a
        href={linkHref}
        className="inline-block bg-royal-purple hover:bg-royal-purple-dark text-soft-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {linkText}
      </a>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
  <div className="bg-slate-gray rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-soft-white/80 text-lg mb-2">{title}</h3>
    <p className="text-electric-cyan text-3xl font-bold">{value}</p>
  </div>
);

const RecentOutfits = () => (
  <div className="bg-slate-gray rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Recent Outfits</h2>
    {/* Add a scrollable list or grid of recent outfits here */}
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-slate-gray rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
    <ul className="space-y-2">
      <li className="flex items-center">
        <FiCalendar className="text-electric-cyan mr-2" />
        <span>Dinner Party - Friday, 8 PM</span>
      </li>
      {/* Add more upcoming events */}
    </ul>
  </div>
);

export default DashboardPage;
