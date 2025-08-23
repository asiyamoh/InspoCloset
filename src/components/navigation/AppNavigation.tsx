import { BottomNavigation, BottomNavigationItem } from './bottom-navigation';
import { useNavigate, useRouter } from '@tanstack/react-router';

export function AppNavigation() {
  const navigate = useNavigate();
  const router = useRouter();
  
  // Get current route pathname
  const currentPath = router.state.location.pathname;

  const handleNavigation = (to: string) => {
    navigate({ to });
  };

  return (
    <BottomNavigation>
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
      <BottomNavigationItem
        icon="👗"
        label="Wedding"
        onClick={() => handleNavigation('/wedding')}
        active={currentPath === '/wedding'}
      />
      <BottomNavigationItem
        icon="🕊️"
        label="Nikah"
        onClick={() => handleNavigation('/nikah')}
        active={currentPath === '/nikah'}
      />
      <BottomNavigationItem
        icon="📷"
        label="Upload"
        onClick={() => handleNavigation('/upload')}
        active={currentPath === '/upload'}
      />
    </BottomNavigation>
  );
} 