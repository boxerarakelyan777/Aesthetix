import React from 'react';
import Link from 'next/link';

export default function SavedOutfitsPage() {
  return (
    <div className="min-h-screen bg-midnight-black text-soft-white p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Saved Outfits</h1>
        <p className="text-lg">Manage your favorite looks and easily access them anytime.</p>
      </header>

      {/* Filtering and Sorting Options */}
      <div className="mb-6">
        {/* Add filtering and sorting components here */}
      </div>

      {/* Outfit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Outfit cards will be rendered here */}
        {/* This is a placeholder for an empty state */}
        <div className="col-span-full text-center">
          <p className="text-xl mb-4">You haven't saved any outfits yet. Start generating your perfect look!</p>
          <Link href="/outfit-generator" className="inline-block bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform">
            Generate Outfit
          </Link>
        </div>
      </div>
    </div>
  );
}
