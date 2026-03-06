import React from "react";
import { ImageSwiper } from "./ImageSwiper";
import { Link } from "react-router-dom";

interface RealEstateItem {
  name: string;
  description: string;
  price: string | number;
  images: string[];
}

interface RealEstateCardProps {
  items: RealEstateItem;
}

export const RealEstateCard: React.FC<RealEstateCardProps> = ({ items }) => {
  return (
    <div className="w-full max-w-[400px] rounded-xl shadow-md border border-gray-200 bg-white overflow-hidden">
      <div className="p-0">
        <ImageSwiper images={items.images} />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">{items.name}</h3>
        <p className="text-sm text-gray-500">{items.description}</p>
        <p>
          <span className="font-semibold">{items.price}</span> 
        </p>
        <Link to={`/product/${items.name}`} className="text-blue-500 hover:underline mt-2 block">View</Link>
      </div>
    </div>
  );
};

export default RealEstateCard;