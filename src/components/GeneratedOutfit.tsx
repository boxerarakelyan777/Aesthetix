import React from 'react';
import Image from 'next/image';

interface OutfitItem {
  itemId: string;
  name: string;
  imageUrl: string;
}

interface GeneratedOutfitProps {
  outfit: {
    outfit: OutfitItem[];
    description: string;
  };
}

const GeneratedOutfit: React.FC<GeneratedOutfitProps> = ({ outfit }) => {
  const replaceItemIdsWithNames = (description: string) => {
    let updatedDescription = description;
    outfit.outfit.forEach(item => {
      const regex = new RegExp(`\\(itemId: ${item.itemId}\\)`, 'g');
      updatedDescription = updatedDescription.replace(regex, `<span class="font-semibold text-electric-cyan">${item.name}</span>`);
    });
    return updatedDescription;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-electric-cyan">Your Generated Outfit</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {outfit.outfit.map((item) => (
          <div key={item.itemId} className="flex flex-col items-center bg-slate-700 rounded-lg p-4 shadow-md">
            <div className="w-full h-48 md:h-64 relative mb-4">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name || 'Outfit item'}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-600 rounded-lg">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-center text-soft-white">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-700 rounded-lg p-6 shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-electric-cyan">Outfit Description</h3>
        <p className="text-soft-white leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceItemIdsWithNames(outfit.description) }}></p>
      </div>
    </div>
  );
};

export default GeneratedOutfit;

