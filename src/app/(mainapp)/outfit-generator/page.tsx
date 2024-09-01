import React from 'react';

const SelectionPanel = ({ title, options }: { title: string; options: string[] }) => (
  <div className="bg-slate-800 rounded-lg p-4 flex-1">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          className="px-3 py-1 bg-slate-700 hover:bg-electric-cyan hover:text-midnight-black rounded transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const ActionButton = ({ text }: { text: string }) => (
  <button className="px-6 py-2 bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white rounded-full hover:scale-105 transition-transform">
    {text}
  </button>
);

export default function OutfitGeneratorPage() {
  return (
    <div className="min-h-screen bg-midnight-black text-soft-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Outfit Generator</h1>
        <p className="text-xl">Create the perfect look for any occasion with AI-powered suggestions.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SelectionPanel title="Mood" options={['Casual', 'Formal', 'Adventurous']} />
        <SelectionPanel title="Occasion" options={['Work', 'Date Night', 'Party']} />
        <SelectionPanel title="Weather" options={['Sunny', 'Rainy', 'Cold']} />
      </div>

      <div className="bg-slate-800 rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Outfit Preview</h2>
        <div className="bg-slate-700 h-64 rounded-lg flex items-center justify-center">
          <p className="text-lg">Your outfit will appear here</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <ActionButton text="Generate Outfit" />
        <ActionButton text="Save Outfit" />
        <ActionButton text="Share Outfit" />
      </div>
    </div>
  );
}
