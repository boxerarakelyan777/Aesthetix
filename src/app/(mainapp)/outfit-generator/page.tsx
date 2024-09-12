'use client'

import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { SelectionPanel, ActionButton } from '../../../components/OutfitGenerator';
import GeneratedOutfit from '../../../components/GeneratedOutfit';

const OutfitGeneratorPage = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); 
  const [preferences, setPreferences] = useState({
    mood: '',
    occasion: '',
    weather: '',
    gender: ''
  });
  const [generatedOutfit, setGeneratedOutfit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          onSelect={(option) => setPreferences({ ...preferences, mood: option })}
          selected={preferences.mood}
        />
        <SelectionPanel
          title="Occasion"
          options={['Work', 'Date Night', 'Party']}
          onSelect={(option) => setPreferences({ ...preferences, occasion: option })}
          selected={preferences.occasion}
        />
        <SelectionPanel
          title="Weather"
          options={['Sunny', 'Rainy', 'Cold']}
          onSelect={(option) => setPreferences({ ...preferences, weather: option })}
          selected={preferences.weather}
        />
        <SelectionPanel
          title="Gender"
          options={['Male', 'Female']}
          onSelect={(option) => setPreferences({ ...preferences, gender: option })}
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
        <GeneratedOutfit outfit={generatedOutfit} />
      ) : null}
    </div>
  );
}

export default OutfitGeneratorPage;
