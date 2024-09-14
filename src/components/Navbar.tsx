"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import ButtonCustomerPortal from './ButtonCustomerPortal';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = ['Features', 'Pricing', 'Contact'];

  return (
    <nav className="bg-midnight-black text-soft-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="text-2xl font-bold text-electric-cyan"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">
            LookMate
          </Link>
        </motion.div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="text-soft-white hover:text-electric-cyan transition duration-300 font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sign Up Button / Dashboard Button / User Button / Billing Button */}
        {isClient && (
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <motion.div whileHover={{ scale: 1.05 }}>
                <SignInButton mode="modal">
                  <button className="px-6 py-2 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full hover:shadow-glow transition duration-300">
                    Sign Up
                  </button>
                </SignInButton>
              </motion.div>
            </SignedOut>
            <SignedIn>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full hover:shadow-glow transition duration-300">
                  Dashboard
                </Link>
              </motion.div>
             
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12"
                  }
                }}
              />
            </SignedIn>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-electric-cyan focus:outline-none"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-midnight-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="block text-soft-white hover:text-electric-cyan transition duration-300 font-medium py-2"
              >
                {item}
              </Link>
            ))}
          </div>
          {isClient && (
            <div className="px-2 pt-2 pb-3 space-y-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-2 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full hover:shadow-glow transition duration-300 text-center">
                    Sign Up
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="block w-full px-6 py-2 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full hover:shadow-glow transition duration-300 text-center">
                  Dashboard
                </Link>
       
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
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
