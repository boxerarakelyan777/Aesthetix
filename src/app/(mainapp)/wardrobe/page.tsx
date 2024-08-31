'use client'

import React, { useState } from 'react';
import Link from 'next/link';

import AddItemButton from '../../../components/AddItemButton';
import CategoryCard from '../../../components/CategoryCard';
import ItemCard from '../../../components/ItemCard';

// Mock data for categories
const categories = [
    { name: 'Shirts', icon: '👕' },
    { name: 'Pants', icon: '👖' },
    { name: 'Shorts', icon: '🩳' },
    { name: 'Jackets', icon: '🧥' },
    { name: 'Accessories', icon: '👜' },
    { name: 'Shoes', icon: '👟' },
    { name: 'Hoodies', icon: '🦺' },
    { name: 'Swimwear', icon: '🩱' },
  ];

// Mock data for items (replace with actual data later)
const itemsData = {
  shirts: [
    { name: 'Blue T-Shirt', image: '/images/blue-tshirt.jpg' },
    { name: 'White Dress Shirt', image: '/images/white-dress-shirt.jpg' },
  ],
  pants: [
    { name: 'Black Jeans', image: '/images/black-jeans.jpg' },
    { name: 'Khaki Chinos', image: '/images/khaki-chinos.jpg' },
  ],
  // Add more categories and items as needed
};

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-midnight-black text-soft-white p-8">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Wardrobe</h1>
        <AddItemButton />
      </header>

      {/* Breadcrumb Navigation */}
      {selectedCategory && (
        <nav className="text-soft-white mb-6">
          <button onClick={() => setSelectedCategory(null)} className="hover:text-electric-cyan">
            My Wardrobe
          </button>
          <span className="mx-2">&gt;</span>
          <span className="text-electric-cyan capitalize">{selectedCategory}</span>
        </nav>
      )}

      {/* Category Grid or Items Grid */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} onClick={() => handleCategoryClick(category.name)}>
              <CategoryCard name={category.name} icon={category.icon} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsData[selectedCategory as keyof typeof itemsData]?.map((item, index) => (
            <ItemCard key={index} name={item.name} image={item.image} />
          ))}
          <div className="flex items-center justify-center">
            <AddItemButton />
          </div>
        </div>
      )}
    </div>
  );
}
