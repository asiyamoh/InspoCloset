import { useState } from "react";
import { BrideSubcategory } from "../data/mockBrideDetails";

interface SubcategoryFlipCardProps {
  subcategory: BrideSubcategory;
}

export function SubcategoryFlipCard({ subcategory }: SubcategoryFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-48 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleClick}
      >
        {/* Front face */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg border-2 border-sageGreen shadow-lg flex flex-col items-center justify-center p-4">
          <div className="text-4xl mb-3">{subcategory.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {subcategory.label}
          </h3>
        </div>

        {/* Back face */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg border-2 border-sageGreen shadow-lg rotate-y-180 p-4">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {subcategory.label}
              </h3>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 text-sm text-gray-600 leading-relaxed">
              {subcategory.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 