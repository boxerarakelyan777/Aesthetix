'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  { name: 'Community', icon: FiUsers, href: '/community' },
  { name: 'Challenges', icon: FiAward, href: '/challenges' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const billingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (billingRef.current && !billingRef.current.contains(event.target as Node)) {
        setBillingOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleBilling = () => setBillingOpen(!billingOpen);

  const handleNavItemClick = (href: string) => {
    if (isMobile) {
      setIsOpen(false);
    }
    router.push(href);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-midnight-black text-soft-white rounded-full shadow-lg transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <aside
        className={`fixed inset-y-0 left-0 bg-midnight-black text-soft-white transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'w-72' : 'w-0 md:w-20'
        } ${!isOpen && !isMobile ? 'overflow-hidden' : ''} ${isMobile && isOpen ? 'overflow-y-auto overflow-x-hidden' : ''}`}
      >
        <div className={`h-full flex flex-col relative ${!isOpen && isMobile ? 'hidden' : ''}`}>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="fixed left-0 top-20 z-50 bg-midnight-black text-soft-white p-2 rounded-r-full shadow-lg hover:bg-slate-700 transition-colors duration-200"
              style={{ transform: isOpen ? 'translateX(15.5rem)' : 'translateX(4.5rem)' }}
            >
              {isOpen ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
            </button>
          )}
          <div className={`flex items-center p-4 border-b border-slate-700 ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <Link href="/" className={`transition-all duration-300 ${isOpen ? '' : 'scale-125'}`}>
              <Image src="/images/logo.png" alt="LookMate Logo" width={isOpen ? 120 : 40} height={isOpen ? 40 : 40} />
            </Link>
            {isMobile && (
              <button onClick={toggleSidebar} className="absolute right-4 text-soft-white p-2">
                <FiX className="w-6 h-6" />
              </button>
            )}
          </div>
          <nav className="flex-grow py-8 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavItemClick(item.href)}
                className={`flex items-center py-4 px-4 my-2 mx-2 rounded-xl transition-all duration-200 w-[calc(100%-1rem)] text-left group hover:bg-slate-800 ${
                  pathname === item.href
                    ? 'bg-electric-cyan bg-opacity-20 text-electric-cyan shadow-md'
                    : 'text-soft-white'
                } ${!isOpen && !isMobile ? 'justify-center' : ''}`}
              >
                <item.icon className={`w-6 h-6 min-w-[1.5rem] transition-colors duration-200 ${
                  pathname === item.href ? 'text-electric-cyan' : 'text-soft-white group-hover:text-electric-cyan'
                } ${isOpen || isMobile ? 'mr-4' : ''}`} />
                <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${
                  isOpen || isMobile ? 'opacity-100 max-w-[calc(100%-2rem)]' : 'opacity-0 w-0'
                } ${pathname === item.href ? 'font-semibold' : 'font-medium'}`}>
                  {item.name}
                </span>
                {pathname === item.href && isOpen && (
                  <div className="absolute right-2 w-1.5 h-8 bg-electric-cyan rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-700" ref={billingRef}>
            <button
              onClick={toggleBilling}
              className={`w-full flex items-center justify-between py-4 px-4 rounded-xl text-soft-white hover:bg-slate-800 transition-all duration-200 group ${!isOpen && !isMobile ? 'justify-center' : ''}`}
            >
              <div className="flex items-center">
                <FiSettings className={`w-6 h-6 min-w-[1.5rem] group-hover:text-electric-cyan transition-colors duration-200 ${isOpen || isMobile ? 'mr-4' : ''}`} />
                <span className={`transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${isOpen || isMobile ? 'opacity-100 max-w-[calc(100%-2rem)]' : 'opacity-0 w-0'} font-medium`}>
                  Settings
                </span>
              </div>
              {(isOpen || isMobile) && (
                <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${billingOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
            {billingOpen && (
              <div className={`mt-4 space-y-2 ${isOpen || isMobile ? 'ml-10' : 'absolute left-full bottom-16 bg-slate-800 p-4 rounded-lg shadow-lg'}`}>
                <ButtonCustomerPortal />
              </div>
            )}
          </div>
        </div>
      </aside>
      <div className={`md:pl-64 transition-all duration-300 ${isOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;