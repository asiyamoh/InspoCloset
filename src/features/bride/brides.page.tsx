import { MainLayout } from "../../components/layout/MainLayout";
import { PlusIcon } from "@heroicons/react/24/solid";

export function BridesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Brides
          </h1>
          <p className="text-sageGreen text-lg">Manage your brides</p>
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <p className="text-sageGreen text-sm">
            Brides feature coming soon...
          </p>
        </div>
      </div>

      {/* Floating New Bride Button */}
              <button className="fixed bottom-20 right-2 bg-dustyRose hover:bg-dustyRose/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 px-4 py-3 group">
        <PlusIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
        Add New Bride
      </button>
    </MainLayout>
  );
}
