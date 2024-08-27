"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight-black text-soft-white p-4 sm:p-6 mt-auto w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <motion.div 
            className="mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-electric-cyan">LookMate</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-royal-purple">Follow us</h2>
              <ul className="text-soft-white">
                <li className="mb-4">
                  <motion.a 
                    href="https://github.com/yourgithubprofile" 
                    className="hover:text-electric-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    GitHub
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="https://www.tiktok.com/@yourtiktokprofile" 
                    className="hover:text-electric-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    TikTok
                  </motion.a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-royal-purple">Legal</h2>
              <ul className="text-soft-white">
                <li className="mb-4">
                  <motion.a 
                    href="/privacy-policy" 
                    className="hover:text-electric-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Privacy Policy
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="/terms" 
                    className="hover:text-electric-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Terms & Conditions
                  </motion.a>
                </li>
              </ul> 
            </div>
          </div>
        </div>

        <hr className="my-6 border-slate-gray sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-soft-white sm:text-center">
            © 2024 <motion.a 
              href="/" 
              className="hover:text-electric-cyan transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              LookMate™
            </motion.a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
