'use client'

import React from 'react';

interface ItemCardProps {
  name: string;
  image: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, image }) => {
  return (
    <div className="bg-slate-gray rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-soft-white font-semibold">{name}</h3>
        <div className="mt-2 flex justify-end space-x-2">
          <button className="text-electric-cyan hover:text-soft-white">Edit</button>
          <button className="text-royal-purple hover:text-soft-white">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;