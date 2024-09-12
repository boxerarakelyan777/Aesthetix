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
  // Function to replace itemIds with item names in the description
  const replaceItemIdsWithNames = (description: string) => {
    let updatedDescription = description;
    outfit.outfit.forEach(item => {
      const regex = new RegExp(`\\(itemId: ${item.itemId}\\)`, 'g');
      updatedDescription = updatedDescription.replace(regex, item.name);
    });
    return updatedDescription;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-electric-cyan">Your Generated Outfit</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {outfit.outfit.map((item) => (
          <div key={item.itemId} className="flex flex-col items-center">
            <div className="w-full h-64 relative mb-2">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name || 'Outfit item'}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>
            <p className="text-sm text-center">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Outfit Description</h3>
        <p>{replaceItemIdsWithNames(outfit.description)}</p>
      </div>
    </div>
  );
};

export default GeneratedOutfit;

