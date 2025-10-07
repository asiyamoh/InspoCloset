import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check for touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check screen size (optional - you can adjust these breakpoints)
      const isSmallScreen = window.innerWidth <= 768;
      
      // Consider it mobile if it has touch OR is small screen
      setIsMobile(hasTouch || isSmallScreen);
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}
