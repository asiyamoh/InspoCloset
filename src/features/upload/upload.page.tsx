import { MainLayout } from '../../components/layout/MainLayout';

export function UploadPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Upload Photos
          </h1>
          <p className="text-sageGreen text-lg">
            Add new inspiration to your collection
          </p>
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <p className="text-sageGreen text-sm">
            Upload feature coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 