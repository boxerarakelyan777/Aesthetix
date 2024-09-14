'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiStar, FiUsers, FiAward, FiSettings, FiChevronLeft, FiChevronRight, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { LiaTshirtSolid } from "react-icons/lia";
import { BiCloset } from "react-icons/bi";
import Image from 'next/image';
import ButtonCustomerPortal from './ButtonCustomerPortal';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-midnight-black text-soft-white rounded-full shadow-lg transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <aside className={`fixed inset-y-0 left-0 bg-midnight-black transition-all duration-300 ease-in-out ${
        isOpen ? 'w-full md:w-64' : 'w-0'
      } flex flex-col justify-between shadow-lg z-40 overflow-hidden`}>
        <div className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`h-full transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b border-slate-gray">
              <Link href="/" legacyBehavior>
                <Image src="/images/logo.png" alt="LookMate Logo" width={100} height={40} />
              </Link>
              <button
                onClick={toggleSidebar}
                className="md:hidden text-soft-white p-2"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 relative overflow-hidden
                    ${pathname === item.href
                      ? 'text-electric-cyan bg-slate-gray bg-opacity-20'
                      : 'text-soft-white hover:bg-slate-gray hover:bg-opacity-10 hover:text-electric-cyan'
                    }`}
                  onClick={() => isMobile && toggleSidebar()}
                >
                  <item.icon className={`w-5 h-5 min-w-[1.25rem] ${pathname === item.href ? 'text-electric-cyan' : ''}`} />
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-electric-cyan rounded-r-lg" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t border-slate-gray">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-full flex items-center justify-between space-x-3 py-3 px-4 text-soft-white hover:text-electric-cyan"
              >
                <div className="flex items-center space-x-3">
                  <FiSettings className="w-5 h-5 min-w-[1.25rem]" />
                  <span>Settings</span>
                </div>
                <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
              </button>
              {settingsOpen && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link href="/settings" className="block py-2 px-4 text-soft-white hover:text-electric-cyan" onClick={() => isMobile && toggleSidebar()}>
                    General Settings
                  </Link>
                  <div className="py-2 px-4">
                    <ButtonCustomerPortal />
                  </div>
                </div>
              )}
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="mt-4 w-full flex justify-center items-center p-2 text-soft-white hover:text-electric-cyan transition-colors duration-200"
                >
                  {isOpen ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;