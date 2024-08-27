"use client";
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-500">
          <Link href="/">
            LookMate
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-700 hover:text-teal-500 transition">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-700 hover:text-teal-500 transition">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-gray-700 hover:text-teal-500 transition">
            Testimonials
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-teal-500 transition">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex">
          <Link href="#signup" className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
            Sign Up
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
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
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#features" className="block text-gray-700 hover:text-teal-500 transition">
              Features
            </Link>
            <Link href="#pricing" className="block text-gray-700 hover:text-teal-500 transition">
              Pricing
            </Link>
            <Link href="#testimonials" className="block text-gray-700 hover:text-teal-500 transition">
              Testimonials
            </Link>
            <Link href="#contact" className="block text-gray-700 hover:text-teal-500 transition">
              Contact
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3">
            <Link href="#signup" className="block px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
