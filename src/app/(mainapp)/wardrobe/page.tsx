'use client'

import React, { useState, useEffect } from 'react';
import AddItemModal from '../../../components/AddItemModal';
import { useAuth } from '@clerk/nextjs';

export default function WardrobePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken, userId } = useAuth();
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchWardrobeItems = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = await getToken();
      if (!userId) {
        throw new Error('User ID is not available');
      }
      const response = await fetch(`https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/wardrobe?userId=${encodeURIComponent(userId)}&page=${currentPage}&category=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch wardrobe items');
      }
      
      const data = await response.json();
      console.log('Wardrobe items:', JSON.stringify(data, null, 2));
      setWardrobeItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
      setError('Error fetching wardrobe items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWardrobeItems();
    }
  }, [userId, currentPage, category, sortBy, sortOrder]);

  const handleItemAdded = () => {
    fetchWardrobeItems();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wardrobe</h1>
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New Item
        </button>
        <div className="flex space-x-4">
          <select onChange={handleCategoryChange} value={category} className="border rounded-md p-2">
            <option value="">All Categories</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="shoes">Shoes</option>
          </select>
          <select onChange={handleSortChange} value={`${sortBy}-${sortOrder}`} className="border rounded-md p-2">
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wardrobeItems.map((item: any) => (
          <div key={item.itemId} className="border rounded-lg p-4">
            <div className="relative w-full h-48 mb-2">
              {!loadedImages[item.itemId] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  Loading...
                </div>
              )}
              <img 
                src={item.presignedUrl}
                alt={item.name} 
                className={`w-full h-full object-cover ${loadedImages[item.itemId] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoadedImages(prev => ({...prev, [item.itemId]: true}))}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-image.jpg';
                  setLoadedImages(prev => ({...prev, [item.itemId]: true}));
                }}
              />
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
            {item.description && <p>Description: {item.description}</p>}
            {item.tags && <p>Tags: {item.tags.join(', ')}</p>}
            {item.labels && <p className="text-sm text-gray-600">Labels: {item.labels.join(', ')}</p>}
            {item.colors && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Colors:</p>
                <div className="flex flex-wrap">
                  {item.colors.map((color: any, index: number) => (
                    <div key={index} className="flex items-center mr-2 mb-1">
                      <div 
                        className="w-4 h-4 rounded-full border mr-1"
                        style={{backgroundColor: color.color}}
                      ></div>
                      <span className="text-xs">{Math.round(color.score * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.patterns && <p className="text-sm text-gray-600">Patterns: {item.patterns.join(', ')}</p>}
            {item.textures && <p className="text-sm text-gray-600">Textures: {item.textures.join(', ')}</p>}
            <p className="text-sm text-gray-600">
              Analysis: {item.analysisComplete ? 'Complete' : 'Pending'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <AddItemModal
          onClose={() => setIsModalOpen(false)}
          onItemAdded={handleItemAdded}
        />
      )}
    </div>
  );
}
