import React from 'react';
import { FaGlasses, FaDumbbell, FaList } from 'react-icons/fa';
import { GiLargeDress } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { PiWatchFill } from "react-icons/pi";
import { LiaTshirtSolid } from "react-icons/lia";
import { GiMonclerJacket } from "react-icons/gi";
import { PiPants } from "react-icons/pi";
import { GiTie } from "react-icons/gi";
interface CategoryIconProps {
  category: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className }) => {
  switch (category.toLowerCase()) {
    case 'tops':
      return <LiaTshirtSolid  className={className} />;
    case 'bottoms':
      return <PiPants className={className} />;
    case 'outerwear':
      return <GiMonclerJacket className={className} />;
    case 'dresses':
      return <GiLargeDress className={className} />;
    case 'footwear':
      return <GiRunningShoe className={className} />;
    case 'accessories':
      return <FaGlasses className={className} />;
    case 'activewear':
      return <FaDumbbell className={className   } />;
    case 'formalwear':
      return <GiTie className={className} />;     
    case 'all':
    default:
      return <FaList className={className} />;
  }
};

export default CategoryIcon;