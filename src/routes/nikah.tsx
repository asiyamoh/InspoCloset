import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '../components/layout/MainLayout';

export const Route = createFileRoute('/nikah')({
  component: Nikah,
});

function Nikah() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Nikah
          </h1>
          <p className="text-sageGreen text-lg">
            Nikah ceremony inspiration
          </p>
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <p className="text-sageGreen text-sm">
            Nikah feature coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 