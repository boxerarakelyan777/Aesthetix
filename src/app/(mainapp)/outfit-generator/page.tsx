'use client'

import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { SelectionPanel, ActionButton } from '../../../components/OutfitGenerator';
import GeneratedOutfit from '../../../components/GeneratedOutfit';

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
    <div className="min-h-screen bg-midnight-black text-soft-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Outfit Generator</h1>
        <p className="text-xl">Create the perfect look for any occasion with AI-powered suggestions.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SelectionPanel
          title="Mood"
          options={['Casual', 'Formal', 'Adventurous']}
          onSelect={(option: string) => setPreferences({ ...preferences, mood: option })}
          selected={preferences.mood}
        />
        <SelectionPanel
          title="Occasion"
          options={['Work', 'Date Night', 'Party']}
          onSelect={(option: string) => setPreferences({ ...preferences, occasion: option })}
          selected={preferences.occasion}
        />
        <SelectionPanel
          title="Weather"
          options={['Sunny', 'Rainy', 'Cold']}
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

      <div className="flex justify-center mb-8">
        <ActionButton text="Generate Outfit" onClick={generateOutfit} disabled={isLoading} />
      </div>

      {isLoading ? (
        <div className="text-center">
          <p className="text-xl">Generating your perfect outfit...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-cyan mx-auto"></div>
        </div>
      ) : generatedOutfit ? (
        <>
          <GeneratedOutfit outfit={generatedOutfit} />
          <div className="flex justify-center mt-4">
            <ActionButton text="Save Outfit" onClick={() => setShowSaveModal(true)} disabled={false} />
          </div>
        </>
      ) : null}

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Save Your Outfit</h3>
            <input
              type="text"
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              placeholder="Enter outfit name"
              className="w-full p-2 mb-4 bg-slate-700 text-soft-white rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowSaveModal(false)}
                className="mr-2 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOutfit}
                className="px-4 py-2 bg-electric-cyan text-midnight-black rounded hover:bg-royal-purple"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutfitGeneratorPage;
