import { useParams, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useBrideDetail } from "./hooks/useBrideDetail";

export function BrideDetailPage() {
  const { brideId } = useParams({ from: "/bride-detail/$brideId" });

  const navigate = useNavigate();
  const { bride, isLoading, error, fetchBrideDetail } = useBrideDetail(brideId);

  useEffect(() => {
    if (brideId) {
      fetchBrideDetail();
    }
  }, [brideId, fetchBrideDetail]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dustyRose mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading bride details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !bride) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-handwritten text-dustyRose mb-4">
            Bride Not Found
          </h1>
          <p className="text-slate-600 mb-4">{error || "Bride not found"}</p>
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

        {/* Bride Info */}
        <div className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue p-6 max-w-2xl mx-auto">
          <div className="text-center">
            <img
              src={bride.profilePicture || "/assets/owl-face.png"}
              alt={bride.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-dustyRose/20"
            />
            <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
              {bride.name}
            </h1>
            <p className="text-slate-600 mb-4">{bride.email}</p>
            <div className="text-sm text-slate-500">
              Created: {new Date(bride.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Placeholder for future subcategories */}
        <div className="text-center py-12">
          <p className="text-slate-600">
            Bride details and subcategories will be available soon.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
