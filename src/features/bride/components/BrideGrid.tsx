import { BrideCard } from "./BrideCard";
import { useBrides } from "../hooks/useBrides";

export function BrideGrid() {
  const { brides } = useBrides();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {brides.map((bride) => (
        <BrideCard key={bride.id} bride={bride} />
      ))}
    </div>
  );
} 