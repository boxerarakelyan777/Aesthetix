import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon }) => {
  return (
    <div 
      className="
        bg-slate-gray rounded-lg p-6
        flex flex-col items-center justify-center
        shadow-md hover:shadow-lg
        transform hover:scale-105 transition duration-300
        cursor-pointer
      "
    >
      <span className="text-4xl mb-2 text-electric-cyan">{icon}</span>
      <h2 className="text-xl font-semibold text-soft-white">{name}</h2>
    </div>
  );
};

export default CategoryCard;