import React from 'react';
import Image from 'next/image';

const GeneratedOutfit = ({ outfit }) => {
  if (!outfit) {
    return <p>No outfit generated yet.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generated Outfit</h2>
      <p className="mb-4">{outfit.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {outfit.items && outfit.items.length > 0 ? (
          outfit.items.map((item) => (
            <div key={item.itemId} className="bg-slate-700 p-2 rounded">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-auto"
              />
              <p className="mt-2 text-sm">{item.name}</p>
            </div>
          ))
        ) : (
          <p>No items in the outfit.</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedOutfit;