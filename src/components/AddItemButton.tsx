'use client'

import React, { useState } from 'react';
import AddItemModal from './AddItemModal';

interface AddItemButtonProps {
  onItemAdded: () => void;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ onItemAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="
          fixed bottom-4 right-4 z-10
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-gradient-to-r from-electric-cyan to-indigo-500
          text-soft-white font-semibold text-2xl
          shadow-md hover:shadow-lg
          transform hover:scale-105 transition duration-300
        "
      >
        +
      </button>
      {isModalOpen && (
        <AddItemModal 
          onClose={() => setIsModalOpen(false)} 
          onItemAdded={() => {
            onItemAdded();
            setIsModalOpen(false);
          }} 
        />
      )}
    </>
  );
};

export default AddItemButton;