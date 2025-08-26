import { PlusIcon } from "@heroicons/react/24/solid";

export function NewBrideButton() {
  return (
    <button className="fixed bottom-20 right-2 bg-dustyRose hover:bg-dustyRose/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 px-4 py-3 group">
      <PlusIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
      Add New Bride
    </button>
  );
} 