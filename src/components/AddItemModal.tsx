'use client'

import React, { useState } from 'react';

interface AddItemModalProps {
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-gray rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-soft-white hover:text-electric-cyan"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-soft-white">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-soft-white mb-2">Item Name</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 rounded bg-midnight-black text-soft-white border border-electric-cyan"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-soft-white mb-2">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-midnight-black text-soft-white border border-electric-cyan"
              required
            >
              <option value="">Select a category</option>
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="shorts">Shorts</option>
              <option value="jackets">Jackets</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-soft-white mb-2">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 rounded bg-midnight-black text-soft-white border border-electric-cyan"
              accept="image/*"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-midnight-black text-soft-white hover:bg-slate-gray"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;