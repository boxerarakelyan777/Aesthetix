'use client'

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';  // Add this import

interface SavedOutfit {
  outfitName: string;
  outfit: {
    outfit: Array<{
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

  return (
    <div className="min-h-screen bg-midnight-black text-soft-white p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Saved Outfits</h1>
        <p className="text-lg">Manage your favorite looks and easily access them anytime.</p>
      </header>

      {isLoading ? (
        <div className="text-center">
          <p className="text-xl">Loading your saved outfits...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-cyan mx-auto"></div>
        </div>
      ) : savedOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedOutfits.map((outfit, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-4 cursor-pointer" onClick={() => handleOutfitClick(outfit)}>
              <h3 className="text-xl font-bold mb-2">{outfit.outfitName}</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {outfit.outfit.outfit.slice(0, 4).map((item, itemIndex) => (
                  <div key={itemIndex} className="relative aspect-square">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">You haven't saved any outfits yet. Start generating your perfect look!</p>
          <Link href="/outfit-generator" className="inline-block bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform">
            Generate Outfit
          </Link>
        </div>
      )}

      {selectedOutfit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedOutfit.outfitName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {selectedOutfit.outfit.outfit.map((item, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="mb-4">{selectedOutfit.outfit.description}</p>
            <button
              onClick={() => setSelectedOutfit(null)}
              className="bg-electric-cyan text-midnight-black font-bold py-2 px-4 rounded hover:bg-royal-purple hover:text-soft-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
