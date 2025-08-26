import { MainLayout } from "../../components/layout/MainLayout";
import { BrideGrid } from "./components/BrideGrid";
import { NewBrideButton } from "./components/NewBrideButton";

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

        <BrideGrid />
      </div>

      <NewBrideButton />
    </MainLayout>
  );
}
