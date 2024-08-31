'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBook, FiGrid, FiStar, FiUsers, FiAward, FiUser } from 'react-icons/fi';
import { LiaTshirtSolid } from "react-icons/lia";
import { BiCloset } from "react-icons/bi";

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

  return (
    <aside className="bg-slate-gray w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200
              ${pathname === item.href
                ? 'bg-electric-cyan text-midnight-black'
                : 'text-soft-white hover:bg-midnight-black hover:text-electric-cyan'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;