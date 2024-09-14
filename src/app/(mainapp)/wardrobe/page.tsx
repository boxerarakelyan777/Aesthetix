'use client'

import React, { useState, useEffect } from 'react';
import AddItemButton from '../../../components/AddItemButton';
import { useAuth } from '@clerk/nextjs';
import CategoryIcon from '../../../components/CategoryIcon';
import { FiChevronDown } from 'react-icons/fi';

const categories = [
  { name: 'All', icon: 'all' },
  { name: 'Tops', icon: 'tops' },
  { name: 'Bottoms', icon: 'bottoms' },
  { name: 'Outerwear', icon: 'outerwear' },
  { name: 'Dresses & Jumpsuits', icon: 'dresses' },
  { name: 'Footwear', icon: 'footwear' },
  { name: 'Accessories', icon: 'accessories' },
  { name: 'Activewear & Loungewear', icon: 'activewear' },
  { name: 'Formalwear', icon: 'formalwear' },
];

export default function WardrobePage() {
  const [wardrobeItems, setWardrobeItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken, userId } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchWardrobeItems();
    }
  }, [userId, currentPage, selectedCategory]);

  const fetchWardrobeItems = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = await getToken();
      if (!userId) {
        throw new Error('User ID is not available');
      }
      const url = `https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/wardrobe?userId=${encodeURIComponent(userId)}&page=${currentPage}&category=${selectedCategory}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch wardrobe items');
      }
      
      const data = await response.json();
      setWardrobeItems(data.items);
      setTotalPages(Math.ceil(data.totalItems / 20)); // Assuming 20 items per page
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
      setError('Error fetching wardrobe items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemAdded = () => {
    fetchWardrobeItems();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-midnight-black text-soft-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-electric-cyan text-center">My Wardrobe</h1>
      <AddItemButton onItemAdded={handleItemAdded} />
      
      {isMobile ? (
        <div className="relative mt-6">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-4 bg-slate-gray bg-opacity-20 rounded-lg text-soft-white"
          >
            <span>{selectedCategory}</span>
            <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-midnight-black border border-slate-gray rounded-lg shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`w-full flex items-center p-4 hover:bg-slate-gray hover:bg-opacity-20 ${
                    selectedCategory === category.name ? 'bg-slate-gray bg-opacity-20' : ''
                  }`}
                >
                  <CategoryIcon category={category.icon} className="w-6 h-6 mr-3 text-electric-cyan" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all duration-300 hover:bg-gradient-to-r from-electric-cyan to-indigo-500 hover:scale-105 transform ${
                selectedCategory === category.name ? 'bg-gradient-to-r from-electric-cyan to-indigo-500' : 'bg-midnight-black'
              }`}
            >
              <CategoryIcon category={category.icon} className="w-10 h-10 mb-2 text-electric-cyan" />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-cyan"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-6 text-center">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            {wardrobeItems.map((item) => (
              <div key={item.id} className="border border-gray-700 rounded-lg p-4 bg-midnight-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex-grow flex items-center justify-center mb-2">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="max-w-full max-h-48 object-contain rounded-md"
                  />
                </div>
                <h3 className="font-semibold text-electric-cyan text-center truncate">{item.name}</h3>
              </div>
            ))}
          </div>
          
          {wardrobeItems.length > 0 && (
            <div className="mt-8 flex justify-center space-x-2 flex-wrap">
              {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded transition-colors duration-300 mb-2 ${
                    currentPage === page 
                      ? 'bg-electric-cyan text-midnight-black' 
                      : 'bg-midnight-black text-electric-cyan border border-electric-cyan hover:bg-electric-cyan hover:text-midnight-black'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
