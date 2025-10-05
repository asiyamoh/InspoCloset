import { useState, useEffect } from 'react';
import { QuickActionsGrid } from "./components/QuickActionsGrid";
import { FolderGrid } from "./components/FolderGrid";
import { EmptyState } from "./components/EmptyState";
import { MainLayout } from "@/components/layout/MainLayout";
import { folderApi, FolderResponse } from '@/utils/api/folder-api';
import { AddFolderModal } from '../folder/components/AddFolderModal';

export function HomePage() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const fetchFolders = async () => {
    try {
      const fetchedFolders = await folderApi.getAllFolders();
      setFolders(fetchedFolders);
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleFolderCreated = () => {
    fetchFolders(); // Refresh folders after creation
  };

  const handleAddFolderClick = () => {
    setIsAddFolderModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddFolderModalOpen(false);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
              Welcome to InspoCloset
            </h1>
            <p className="text-sageGreen text-lg">
              Your bridal inspiration scrapbook
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-sageGreen">Loading your folders...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Welcome to InspoCloset
          </h1>
          <p className="text-sageGreen text-lg">
            Your bridal inspiration scrapbook
          </p>
        </div>

        {/* Folders Section */}
        {folders.length === 0 ? (
          <EmptyState onAddFolder={handleAddFolderClick} />
        ) : (
          <>
            <div>
              <h2 className="text-xl font-handwritten text-dustyRose mb-4">
                Your Folders
              </h2>
              <FolderGrid folders={folders} />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-handwritten text-dustyRose mb-4">
                Quick Actions
              </h2>
              <QuickActionsGrid 
                folderCount={folders.length} 
                onAddFolder={handleAddFolderClick}
              />
            </div>
          </>
        )}

        {/* Add Folder Modal */}
        <AddFolderModal
          isOpen={isAddFolderModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleFolderCreated}
        />
      </div>
    </MainLayout>
  );
}
