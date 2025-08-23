import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '../features/home/home.page';
import { MainLayout } from '../components/layout/MainLayout';

export const Route = createFileRoute('/home')({
  component: Home,
});

function Home() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
} 