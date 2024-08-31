'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiStar, FiUsers, FiAward, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LiaTshirtSolid } from "react-icons/lia";
import { BiCloset } from "react-icons/bi";
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'Outfit Generator', icon: LiaTshirtSolid, href: '/outfit-generator' },
  { name: 'Wardrobe', icon: BiCloset, href: '/wardrobe' },
  { name: 'Saved Outfits', icon: FiStar, href: '/saved-outfits' },
  { name: 'Community (Coming Soon)', icon: FiUsers, href: '' },
  { name: 'Challenges (Coming Soon)', icon: FiAward, href: '' },

];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-midnight-black min-h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} flex flex-col justify-between shadow-lg relative`}>
      <div className="p-4">
        <div className={`flex justify-${isOpen ? 'start' : 'center'} mb-8`}>
          <Link href="/" legacyBehavior>
            <Image src="/images/logo.png" alt="LookMate Logo" width={isOpen ? 100 : 40} height={40} className="transition-all duration-300" />
          </Link>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 relative overflow-hidden
                ${pathname === item.href
                  ? 'text-electric-cyan bg-slate-gray bg-opacity-20'
                  : 'text-soft-white hover:bg-slate-gray hover:bg-opacity-10 hover:text-electric-cyan'
                }`}
            >
              <item.icon className={`w-5 h-5 min-w-[1.25rem] ${pathname === item.href ? 'text-electric-cyan' : ''}`} />
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{item.name}</span>
              {pathname === item.href && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-electric-cyan rounded-r-lg" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-slate-gray">
        <Link href="/settings" className="flex items-center space-x-3 py-3 px-4 text-soft-white hover:text-electric-cyan">
          <FiSettings className="w-5 h-5 min-w-[1.25rem]" />
          <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Settings</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 w-full flex justify-center items-center p-2 text-soft-white hover:text-electric-cyan transition-colors duration-200"
        >
          {isOpen ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;