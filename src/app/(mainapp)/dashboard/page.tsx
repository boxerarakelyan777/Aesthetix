import React from 'react';
import { FiGrid, FiStar } from 'react-icons/fi';
import { LiaTshirtSolid } from "react-icons/lia";
import { BiCloset } from "react-icons/bi";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-electric-cyan">Welcome to Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      <div className="bg-slate-gray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>You generated a new outfit for "Casual Friday"</li>
          <li>Added 3 new items to your wardrobe</li>
          <li>Saved a new favorite outfit</li>
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon: Icon, description, linkText, linkHref }) => {
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

export default DashboardPage;
