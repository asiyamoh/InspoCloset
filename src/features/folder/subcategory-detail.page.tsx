import { useParams } from "@tanstack/react-router";
import { useFolderDetail } from "./hooks/useFolderDetail";
import { MainLayout } from "../../components/layout/MainLayout";
import { SubcategoryDetailContent } from "./components/SubcategoryDetailContent";

export function SubcategoryDetailPage() {
  const { folderId, subcategoryId } = useParams({ 
    from: "/folder-details/$folderId/subcategory/$subcategoryId" 
  });
  const { folder, loading, error } = useFolderDetail(folderId);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-dustyRose">Loading subcategory details...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading folder: {error}</div>
        </div>
      </MainLayout>
    );
  }

  if (!folder) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-dustyRose">Folder not found</div>
        </div>
      </MainLayout>
    );
  }

  // Find the specific subcategory
  const subcategories = folder.subcategories || folder.categories || [];
  const subcategory = subcategories.find(sub => sub.id === subcategoryId);

  if (!subcategory) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-dustyRose">Subcategory not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SubcategoryDetailContent 
        folder={folder} 
        subcategory={subcategory} 
      />
    </MainLayout>
  );
}
