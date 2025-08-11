import { BottomNavigation, BottomNavigationItem } from './bottom-navigation';

export function AppNavigation() {
  // You can add logic here to determine which page is active
  // For now, we'll set home as active as an example
  const currentPage = 'home';

  return (
    <BottomNavigation>
      <BottomNavigationItem
        icon="🏠"
        label="Home"
        href="/"
        active={currentPage === 'home'}
      />
      <BottomNavigationItem
        icon="👰"
        label="Brides"
        href="/brides"
        // active={currentPage === 'brides'}
      />
      <BottomNavigationItem
        icon="👗"
        label="Wedding"
        href="/wedding"
        // active={currentPage === 'wedding'}
      />
      <BottomNavigationItem
        icon="🕊️"
        label="Nikah"
        href="/nikah"
        // active={currentPage === 'nikah'}
      />
      <BottomNavigationItem
        icon="📷"
        label="Upload"
        href="/upload"
        // active={currentPage === 'upload'}
      />
    </BottomNavigation>
  );
} 