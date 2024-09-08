import React, { useState, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import ReactDOM from 'react-dom';

interface AddItemModalProps {
  onClose: () => void;
  onItemAdded: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onItemAdded }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getToken, userId } = useAuth();

  const categories = [
    'Tops', 'Bottoms', 'Outerwear', 'Dresses & Jumpsuits',
    'Footwear', 'Accessories', 'Activewear & Loungewear', 'Formalwear'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!itemName || !category || !image) {
      setError('Please fill all fields and select an image.');
      setIsLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const imageData = await convertImageToBase64(image);

      const requestBody = {
        userId,
        itemName,
        category,
        imageData
      };

      const response = await fetch('https://d5g25g7ru0.execute-api.us-east-1.amazonaws.com/prod/wardrobe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok && data.message === "Item added successfully") {
        onItemAdded();
        onClose();
      } else {
        const errorMessage = data.error || 'Unknown error occurred';
        setError(`Failed to add item: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setFileName(file ? file.name : '');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-midnight-black rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-extrabold text-electric-cyan mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-300">Item Name</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-700 bg-midnight-black shadow-sm focus:border-electric-cyan focus:ring focus:ring-electric-cyan focus:ring-opacity-50 text-soft-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-700 bg-midnight-black shadow-sm focus:border-electric-cyan focus:ring focus:ring-electric-cyan focus:ring-opacity-50 text-soft-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              required
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-gradient-to-r from-electric-cyan to-indigo-500 text-white rounded-l-md hover:from-indigo-500 hover:to-electric-cyan transition-all transform hover:scale-105"
              >
                Choose File
              </button>
              <span className="flex-1 bg-midnight-black border border-gray-700 rounded-r-md py-2 px-3 text-gray-300 truncate">
                {fileName || 'No file chosen'}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-electric-cyan to-indigo-500 text-white rounded-md hover:from-indigo-500 hover:to-electric-cyan transition-all transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default AddItemModal;