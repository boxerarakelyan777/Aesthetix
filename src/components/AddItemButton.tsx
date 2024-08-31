'use client'

import React, { useState } from 'react';
import AddItemModal from './AddItemModal';

const AddItemButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="
          flex items-center justify-center
          px-4 py-2 rounded-full
          bg-gradient-to-r from-electric-cyan to-royal-purple
          text-soft-white font-semibold
          shadow-md hover:shadow-lg
          transform hover:scale-105 transition duration-300
        "
      >
        <span className="mr-2">+</span>
        Add Item
      </button>
      {isModalOpen && <AddItemModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AddItemButton;