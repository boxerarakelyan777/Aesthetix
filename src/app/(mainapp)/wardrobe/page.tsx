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

  const fetchWardrobeItems = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = await getToken();
      if (!userId) {
        throw new Error('User ID is not available');
      }
      console.log('Fetching wardrobe items for userId:', userId);
      const response = await fetch(`https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/wardrobe?userId=${encodeURIComponent(userId)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetch response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      console.log('Parsed response:', data);
      
      if (response.ok) {
        if (data.items) {
          setWardrobeItems(data.items);
        } else if (data.body) {
          const bodyData = JSON.parse(data.body);
          setWardrobeItems(bodyData.items || []);
        } else {
          setWardrobeItems([]);
        }
      } else {
        const errorMessage = data.error || (data.body && JSON.parse(data.body).error) || 'Failed to fetch wardrobe items';
        console.error('Failed to fetch wardrobe items:', errorMessage);
        setError(errorMessage);
      }
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
  }, [userId]);

  const handleItemAdded = () => {
    fetchWardrobeItems();
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add New Item
      </button>
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
                src={item.presignedUrl} // Use the pre-signed URL here
                alt={item.name} 
                className={`w-full h-full object-cover ${loadedImages[item.itemId] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => {
                  console.log(`Image loaded successfully: ${item.presignedUrl}`);
                  setLoadedImages(prev => ({...prev, [item.itemId]: true}));
                }}
                onError={(e) => {
                  console.error(`Error loading image: ${item.presignedUrl}`);
                  e.currentTarget.src = '/placeholder-image.jpg';
                  setLoadedImages(prev => ({...prev, [item.itemId]: true}));
                }}
              />
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.category}</p>
          </div>
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
