"use client";

import React, { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (newValue: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleStarClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    newValue: number
  ) => {
    e.preventDefault();
    if (newValue === value) {
      onChange?.(0);
      return;
    }
    onChange?.(newValue);
  };

  const handleStarHover = (newValue: number) => {
    setHoverValue(newValue);
  };

  const handleStarLeave = () => {
    setHoverValue(null);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          onClick={(e) => handleStarClick(e, index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          className={`${
            (hoverValue || value) >= index ? "text-yellow-500" : "text-gray-300"
          } text-2xl cursor-pointer`}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};
