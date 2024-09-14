'use client'

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiPlus } from 'react-icons/fi';

interface SavedOutfit {
  outfitName: string;
  outfit: {
    outfit: Array<{
      itemId: string;
      name: string;
      imageUrl: string;
    }>;
    description: string;
  };
}

export default function SavedOutfitsPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState<SavedOutfit | null>(null);

  useEffect(() => {
    const fetchSavedOutfits = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        const response = await fetch(`https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/saved-outfits?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch saved outfits');
        }

        const data = await response.json();
        setSavedOutfits(data.outfits);
      } catch (error) {
        console.error('Error fetching saved outfits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedOutfits();
  }, [user, getToken]);

  const handleOutfitClick = (outfit: SavedOutfit) => {
    setSelectedOutfit(outfit);
  };

  const replaceItemIdsWithNames = (description: string, outfit: SavedOutfit['outfit']) => {
    let updatedDescription = description;
    outfit.outfit.forEach(item => {
      const regex = new RegExp(`\\(itemId: ${item.itemId}\\)`, 'g');
      updatedDescription = updatedDescription.replace(regex, `<span class="font-semibold text-electric-cyan">${item.name}</span>`);
    });
    return updatedDescription;
  };

  return (
    <div className="min-h-screen from-midnight-black to-slate-900 text-soft-white p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-electric-cyan to-royal-purple text-transparent bg-clip-text">Saved Outfits</h1>
        <p className="text-xl text-gray-300">Your personal collection of curated looks</p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-t-4 border-electric-cyan border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-xl text-gray-300">Loading your fashion collection...</p>
        </div>
      ) : savedOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {savedOutfits.map((outfit, index) => (
            <div 
              key={index} 
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-electric-cyan hover:shadow-md cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleOutfitClick(outfit)}
            >
              <div className="relative h-64">
                <Image
                  src={outfit.outfit.outfit[0].imageUrl}
                  alt={outfit.outfitName}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">{outfit.outfitName}</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-300">{outfit.outfit.outfit.length} items</p>
                  <button className="text-electric-cyan hover:text-royal-purple transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-slate-800 rounded-xl p-8 shadow-lg max-w-md mx-auto">
          <FiPlus className="w-16 h-16 mx-auto mb-4 text-electric-cyan" />
          <p className="text-xl mb-6 text-gray-300">Your outfit collection is empty. Start creating your perfect looks!</p>
          <Link href="/outfit-generator" className="inline-block bg-gradient-to-r from-electric-cyan to-royal-purple text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Generate Your First Outfit
          </Link>
        </div>
      )}

      {selectedOutfit && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-8 max-w-4xl w-full relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedOutfit(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FiX className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-electric-cyan">{selectedOutfit.outfitName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {selectedOutfit.outfit.outfit.map((item, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <p className="absolute bottom-2 left-2 right-2 text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-slate-700 rounded-lg p-6 shadow-inner">
              <h3 className="text-2xl font-semibold mb-4 text-electric-cyan">Outfit Description</h3>
              <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceItemIdsWithNames(selectedOutfit.outfit.description, selectedOutfit.outfit) }}></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
