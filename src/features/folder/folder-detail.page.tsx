import { useParams } from "@tanstack/react-router";
import { useFolderDetail } from "./hooks/useFolderDetail";  
import { MainLayout } from "../../components/layout/MainLayout";
import { AppHeader } from "../../components/layout/AppHeader";
import { FolderDetailContent } from "./components/FolderDetailContent";

export function FolderDetailPage() {
  const { folderId } = useParams({ from: "/folder/$folderId" });
  const { folder, loading, error } = useFolderDetail(folderId);

  if (loading) {
    return (
      <MainLayout>
        <AppHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-dustyRose">Loading folder details...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <AppHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading folder: {error}</div>
        </div>
      </MainLayout>
    );
  }

  if (!folder) {
    return (
      <MainLayout>
        <AppHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-dustyRose">Folder not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FolderDetailContent folder={folder} />
    </MainLayout>
  );
}
