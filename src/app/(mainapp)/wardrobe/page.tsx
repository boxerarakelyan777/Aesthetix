'use client'

import React, { useState, useEffect } from 'react';
import AddItemButton from '../../../components/AddItemButton';
import { useAuth } from '@clerk/nextjs';
import CategoryIcon from '../../../components/CategoryIcon';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

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

  useEffect(() => {
    document.title = "My Wardrobe";
  }, []);

  return (
    <div className="bg-midnight-black text-soft-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-electric-cyan">My Wardrobe</h1>
          <p className="text-xl text-gray-300">Organize and manage your fashion items with ease.</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <AddItemButton onItemAdded={handleItemAdded} />
          <div className="mt-4 md:mt-0 relative">
            <input
              type="text"
              placeholder="Search items..."
              className="bg-slate-800 text-soft-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {isMobile ? (
          <div className="relative mb-8">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg text-soft-white shadow-lg"
            >
              <span className="flex items-center">
                <CategoryIcon category={categories.find(c => c.name === selectedCategory)?.icon || 'all'} className="w-6 h-6 mr-3 text-electric-cyan" />
                {selectedCategory}
              </span>
              <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 rounded-lg shadow-xl">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`w-full flex items-center p-4 hover:bg-slate-700 ${
                      selectedCategory === category.name ? 'bg-slate-700' : ''
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
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-slate-700 ${
                  selectedCategory === category.name ? 'bg-slate-700 ring-2 ring-electric-cyan' : 'bg-slate-800'
                }`}
              >
                <CategoryIcon category={category.icon} className="w-8 h-8 mb-2 text-electric-cyan" />
                <span className="text-sm text-center">{category.name}</span>
              </button>
            ))}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-electric-cyan"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 mt-6 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {wardrobeItems.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col">
                  <div className="flex-grow flex items-center justify-center mb-4">
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
              <div className="mt-12 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm">
                  {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm font-medium ${
                        currentPage === page 
                          ? 'bg-electric-cyan text-midnight-black' 
                          : 'bg-slate-800 text-soft-white hover:bg-slate-700'
                      } ${page === 1 ? 'rounded-l-md' : ''} ${page === totalPages ? 'rounded-r-md' : ''} focus:z-10 focus:outline-none focus:ring-2 focus:ring-electric-cyan`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
