'use client'

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { SelectionPanel, ActionButton } from '../../../components/OutfitGenerator';
import GeneratedOutfit from '../../../components/GeneratedOutfit';
import { FiX } from 'react-icons/fi';

interface Preferences {
  mood: string;
  occasion: string;
  weather: string;
  gender: string;
}

const OutfitGeneratorPage = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); 
  const [preferences, setPreferences] = useState<Preferences>({
    mood: '',
    occasion: '',
    weather: '',
    gender: ''
  });
  const [generatedOutfit, setGeneratedOutfit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    document.title = "Outfit Generator";
  }, []);

  const generateOutfit = async () => {
    if (!user) {
      alert('Please sign in to generate an outfit');
      return;
    }

    if (Object.values(preferences).some(pref => pref === '')) {
      alert('Please select all preferences before generating an outfit');
      return;
    }

    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await fetch('https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/generate-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate outfit');
      }

      const data = await response.json();

      if (data.outfit && Array.isArray(data.outfit.outfit)) {
        setGeneratedOutfit(data.outfit);
      } else {
        throw new Error('Invalid outfit data received');
      }
    } catch (error) {
      alert('Failed to generate outfit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveOutfit = async () => {
    if (!user) {
      alert('Please sign in to save an outfit');
      return;
    }

    if (!outfitName.trim()) {
      alert('Please enter a name for your outfit');
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch('https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/save-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user?.id,
          outfitName: outfitName,
          outfit: generatedOutfit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save outfit');
      }

      alert('Outfit saved successfully!');
      setShowSaveModal(false);
      setOutfitName('');
    } catch (error) {
      alert('Failed to save outfit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  from-midnight-black to-slate-800 text-soft-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-royal-purple">Outfit Generator</h1>
          <p className="text-xl text-gray-300">Create the perfect look for any occasion with AI-powered suggestions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SelectionPanel
            title="Mood"
            options={['Casual', 'Formal', 'Adventurous', 'Romantic', 'Professional', 'Relaxed', 'Energetic', 'Creative']}
            onSelect={(option: string) => setPreferences({ ...preferences, mood: option })}
            selected={preferences.mood}
          />
          <SelectionPanel
            title="Occasion"
            options={['Work', 'Date Night', 'Party', 'Wedding', 'Beach Day', 'Workout', 'Travel', 'Night Out', 'Business Meeting', 'Casual Outing']}
            onSelect={(option: string) => setPreferences({ ...preferences, occasion: option })}
            selected={preferences.occasion}
          />
          <SelectionPanel
            title="Weather"
            options={['Sunny', 'Rainy', 'Cold', 'Hot', 'Windy', 'Snowy', 'Mild', 'Humid']}
            onSelect={(option: string) => setPreferences({ ...preferences, weather: option })}
            selected={preferences.weather}
          />
          <SelectionPanel
            title="Gender"
            options={['Male', 'Female']}
            onSelect={(option: string) => setPreferences({ ...preferences, gender: option })}
            selected={preferences.gender}
          />
        </div>

        <div className="flex justify-center mb-12">
          <ActionButton text="Generate Outfit" onClick={generateOutfit} disabled={isLoading} />
        </div>

        {isLoading ? (
          <div className="text-center">
            <p className="text-xl mb-4">Generating your perfect outfit...</p>
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-electric-cyan"></div>
          </div>
        ) : generatedOutfit ? (
          <>
            <GeneratedOutfit outfit={generatedOutfit} />
            <div className="flex justify-center mt-8">
              <ActionButton text="Save Outfit" onClick={() => setShowSaveModal(true)} disabled={false} />
            </div>
          </>
        ) : null}

        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full relative">
              <button
                onClick={() => setShowSaveModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4 text-electric-cyan">Save Your Outfit</h3>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                placeholder="Enter outfit name"
                className="w-full p-3 mb-4 bg-slate-700 text-soft-white rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-cyan"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="mr-4 px-6 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <ActionButton text="Save" onClick={handleSaveOutfit} disabled={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutfitGeneratorPage;
