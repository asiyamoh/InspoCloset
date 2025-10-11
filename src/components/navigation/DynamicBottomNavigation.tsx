import { BottomNavigation, BottomNavigationItem } from './bottom-navigation';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useFavorites } from '../../hooks/useFavorites';
import { FeatureGate } from '../guards/feature-guard/feature-gate';

export function DynamicBottomNavigation() {
  const navigate = useNavigate();
  const router = useRouter();
  const { favorites, isLoading } = useFavorites();
  
  // Get current route pathname
  const currentPath = router.state.location.pathname;

  const handleNavigation = (to: string) => {
    navigate({ to });
  };

  // Calculate total items for grid layout
  // Check if bride feature is enabled to include it in count
  const environment = window.location.origin.includes('localhost') ? 'local' : 
                     window.location.origin.includes('develop') ? 'development' : 
                     window.location.origin.includes('staging') ? 'staging' : 'production';
  const isBrideEnabled = environment === 'local' || environment === 'development';
  const totalItems = (isBrideEnabled ? 3 : 2) + favorites.length; // Home + (Brides) + Upload + favorites
  const gridCols = totalItems === 2 ? 'grid-cols-2' : totalItems === 3 ? 'grid-cols-3' : totalItems === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <BottomNavigation gridCols={gridCols}>
      <BottomNavigationItem
        icon="🏠"
        label="Home"
        onClick={() => handleNavigation('/home')}
        active={currentPath === '/home'}
      />
      <FeatureGate feature="bride">
        <BottomNavigationItem
          icon="👰"
          label="Brides"
          onClick={() => handleNavigation('/brides')}
          active={currentPath === '/brides'}
        />
      </FeatureGate>
      
      {/* Render favorite folders */}
      {!isLoading && favorites.map((favorite) => (
        <BottomNavigationItem
          key={favorite.id}
          icon={favorite.icon}
          label={favorite.name}
          onClick={() => handleNavigation(`/folder/${favorite.id}`)}
          active={currentPath === `/folder/${favorite.id}`}
        />
      ))}
      
      <BottomNavigationItem
        icon="📷"
        label="Upload"
        onClick={() => handleNavigation('/upload')}
        active={currentPath === '/upload'}
      />
    </BottomNavigation>
  );
}
