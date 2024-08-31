"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaTiktok, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight-black text-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-electric-cyan">LookMate</span>
            </Link>
            <p className="text-soft-white/80 mb-4">
              Elevate your style with AI-powered outfit recommendations tailored to your preferences and the weather.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="https://github.com/boxerarakelyan777/LookMate" icon={<FaGithub />} />
              <SocialIcon href="https://www.tiktok.com/@lookmateai" icon={<FaTiktok />} />
              <SocialIcon href="https://x.com/LookMateAI" icon={<FaTwitter />} />
              <SocialIcon href="https://www.instagram.com/lookmateai/" icon={<FaInstagram />} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-cyan">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-cyan">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-slate-gray/30" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-soft-white/60 text-sm">
            © {new Date().getFullYear()} LookMate. All rights reserved.
          </p>
          <p className="text-soft-white/60 text-sm mt-2 md:mt-0">
            Designed and built with ❤️ by the LookMate team
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-soft-white/80 hover:text-electric-cyan transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <motion.a
      href={href}
      className="text-soft-white/80 hover:text-electric-cyan transition-colors duration-300"
      whileHover={{ x: 5 }}
    >
      {children}
    </motion.a>
  </li>
);

export default Footer;
