import { useParams, useNavigate } from "@tanstack/react-router";
import { MainLayout } from "../../components/layout/MainLayout";
import { useBrideDetail } from "./hooks/useBrideDetail";
import { SubcategoryFlipCard } from "./components/SubcategoryFlipCard";

export function BrideDetailPage() {
  const { brideId } = useParams({ from: "/bride-detail/$brideId" });

  const navigate = useNavigate();
  const bride = useBrideDetail(brideId);

  if (!bride) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-handwritten text-dustyRose mb-4">
            Bride Not Found
          </h1>
          <button
            onClick={() => navigate({ to: "/brides" })}
            className="text-sageGreen hover:text-dustyRose transition-colors"
          >
            ← Back to Brides
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate({ to: "/brides" })}
            className="inline-flex items-center px-4 py-2 bg-white border-2 border-sageGreen/30 rounded-lg text-sageGreen hover:bg-sageGreen hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back 
          </button>
        </div>

        {/* Subcategory Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {bride.subcategories.map((subcategory) => (
            <SubcategoryFlipCard
              key={subcategory.key}
              subcategory={subcategory}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
