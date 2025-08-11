import { AppNavigation } from './AppNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen pb-16">
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <AppNavigation />
    </div>
  );
} 