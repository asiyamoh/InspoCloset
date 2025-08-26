import type { Bride } from "../types";

type BrideCardProps = {
  bride: Bride;
};

export function BrideCard({ bride }: BrideCardProps) {
  return (
    <div className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue overflow-hidden">
      <div className="relative">
        <img
          src={bride.coverImageUrl}
          alt={bride.fullName}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-dustyRose" />
      </div>
      <div className="p-3">
        <div className="bg-white rounded-md border border-dustyRose/20 shadow-sm px-3 py-2 text-center">
          <span className="text-slate-800 font-medium">{bride.fullName}</span>
        </div>
      </div>
    </div>
  );
} 