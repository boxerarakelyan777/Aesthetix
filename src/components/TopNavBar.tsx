'use client'
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { FiBell, FiSearch } from 'react-icons/fi';

const TopNavBar = () => {
  return (
    <header className="bg-midnight-black border-b border-slate-gray">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="text-2xl font-bold text-electric-cyan">LookMate</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-gray text-soft-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-white" />
          </div>
          <button className="text-soft-white hover:text-electric-cyan">
            <FiBell className="w-6 h-6" />
          </button>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;