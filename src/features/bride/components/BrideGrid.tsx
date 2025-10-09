import { useEffect } from "react";
import { BrideCard } from "./BrideCard";
import { useBrides } from "../hooks/useBrides";

export function BrideGrid() {
  const { brides, isLoading, error, fetchBrides } = useBrides();

  useEffect(() => {
    fetchBrides();
  }, [fetchBrides]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dustyRose mx-auto"></div>
        <p className="text-sageGreen mt-2">Loading brides...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchBrides}
          className="px-4 py-2 bg-sageGreen text-white rounded-lg hover:bg-dustyRose transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {brides.map((bride) => (
        <BrideCard key={bride.id} bride={bride} />
      ))}
    </div>
  );
} 