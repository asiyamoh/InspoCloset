import { AppNavigation } from './AppNavigation';
import { AppHeader } from './AppHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen pb-16">
      {/* Top header with search bar */}
      <AppHeader />
      
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <AppNavigation />
    </div>
  );
} 