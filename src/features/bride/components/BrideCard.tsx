import { useNavigate } from "@tanstack/react-router";
import type { Bride } from "../types";

type BrideCardProps = {
  bride: Bride;
};

export function BrideCard({ bride }: BrideCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: `/bride-detail/${bride.id}` });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <div className="relative">
        <img
          src={bride.profilePicture || "/assets/owl-face.png"}
          alt={bride.name}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-dustyRose" />
      </div>
      <div className="p-3">
        <div className="bg-white rounded-md border border-dustyRose/20 shadow-sm px-3 py-2 text-center">
          <span className="text-slate-800 font-medium">{bride.name}</span>
        </div>
      </div>
    </div>
  );
}
