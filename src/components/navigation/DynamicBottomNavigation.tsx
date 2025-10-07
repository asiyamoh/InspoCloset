import { BottomNavigation, BottomNavigationItem } from './bottom-navigation';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useFavorites } from '../../hooks/useFavorites';

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
  const totalItems = 3 + favorites.length; // Home + Brides + Upload + favorites
  const gridCols = totalItems === 3 ? 'grid-cols-3' : totalItems === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <BottomNavigation gridCols={gridCols}>
      <BottomNavigationItem
        icon="🏠"
        label="Home"
        onClick={() => handleNavigation('/home')}
        active={currentPath === '/home'}
      />
      <BottomNavigationItem
        icon="👰"
        label="Brides"
        onClick={() => handleNavigation('/brides')}
        active={currentPath === '/brides'}
      />
      
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
