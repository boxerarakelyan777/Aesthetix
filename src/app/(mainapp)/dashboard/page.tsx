'use client'

import React, { useEffect } from 'react';
import { FiGrid, FiStar, FiCalendar, FiTrendingUp } from 'react-icons/fi';
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
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="bg-midnight-black text-soft-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-electric-cyan mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl text-gray-300">Manage your wardrobe and create stunning outfits with ease.</p>
        </header>

        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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


      </div>
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon: Icon, description, linkText, linkHref }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <Icon className="w-10 h-10 text-electric-cyan mr-4" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-300 mb-6">{description}</p>
      <a
        href={linkHref}
        className="inline-block bg-electric-cyan hover:bg-royal-purple text-midnight-black font-bold py-2 px-6 rounded-full transition duration-300"
      >
        {linkText}
      </a>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: IconType;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon }) => (
  <div className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-300 text-lg">{title}</h3>
      <Icon className="w-8 h-8 text-electric-cyan" />
    </div>
    <p className="text-4xl font-bold text-soft-white">{value}</p>
  </div>
);

const RecentOutfits = () => (
  <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-electric-cyan">Recent Outfits</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex items-center bg-slate-700 rounded-lg p-4">
          <div className="w-16 h-16 bg-gray-600 rounded-full mr-4"></div>
          <div>
            <h3 className="font-semibold">Outfit Name</h3>
            <p className="text-sm text-gray-400">Created 2 days ago</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-electric-cyan">Upcoming Events</h2>
    <ul className="space-y-4">
      {[1, 2, 3].map((_, index) => (
        <li key={index} className="flex items-center bg-slate-700 rounded-lg p-4">
          <FiCalendar className="text-electric-cyan mr-4 w-6 h-6" />
          <div>
            <h3 className="font-semibold">Event Name</h3>
            <p className="text-sm text-gray-400">Friday, 8 PM</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardPage;
