'use client'
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { FiBell, FiSearch } from 'react-icons/fi';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const TopNavBar = () => {
  return (
    <header className="bg-midnight-black border-b border-slate-gray h-16 shadow-sm">
      <div className="flex justify-between items-center px-6 h-full">
        {/* Left section - Empty now */}
        <div className="w-10"></div>

        {/* Center section - Search bar */}
        <div className="flex-grow max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-gray text-soft-white rounded-full py-2 px-4 pl-10 
                         focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all
                         placeholder-slate-400"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric-cyan" />
          </div>
        </div>

        {/* Right section - Notifications and User button */}
        <div className="flex items-center space-x-4">
          <button className="text-soft-white hover:text-electric-cyan transition-colors">
            <FiBell className="w-6 h-6" />
          </button>
          <SignedIn>
            <div className="flex justify-center mt-2">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;