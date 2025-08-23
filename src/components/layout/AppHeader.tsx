import { TopSearchBar } from "../navigation/TopSearchBar";
import { Avatar } from "../ui/Avatar";
import { useNavigate } from "@tanstack/react-router";

export function AppHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/home" });
  };

  return (
    <div className="w-full px-4 py-3 bg-ivoryCream border-b border-dustyRose/30 shadow-photo-glue">
      {/* Top row: App name (center) + Avatar (right) */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1"></div> {/* Left spacer for centering */}
        <h1 className="text-2xl font-bold text-dustyRose" onClick={handleClick}>
          InspoCloset
        </h1>
        <div className="flex-1 flex justify-end">
          <Avatar />
        </div>
      </div>

      {/* Bottom row: Search bar */}
      <TopSearchBar />
    </div>
  );
}
