import { useState, ReactNode, useEffect } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

interface InfoTooltipProps {
  content: string;
  icon?: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function InfoTooltip({ 
  content, 
  icon = 'ℹ️', 
  placement = 'top',
  className = '' 
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Handle click outside to close on mobile
  useEffect(() => {
    if (isMobile && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (!target.closest('[data-tooltip-container]')) {
          setIsVisible(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobile, isVisible]);

  const getTooltipClasses = () => {
    const baseClasses = 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg transition-opacity duration-200';
    
    // Add max-width and text wrapping for mobile to prevent cutoff
    const mobileClasses = isMobile ? 'max-w-48 whitespace-normal' : 'whitespace-nowrap';
    
    // Use left placement for mobile to prevent cutoff
    const effectivePlacement = isMobile ? 'left' : placement;
    
    switch (effectivePlacement) {
      case 'top':
        return `${baseClasses} ${mobileClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-1`;
      case 'bottom':
        return `${baseClasses} ${mobileClasses} top-full left-1/2 transform -translate-x-1/2 mt-1`;
      case 'left':
        return `${baseClasses} ${mobileClasses} right-full top-1/2 transform -translate-y-1/2 mr-1`;
      case 'right':
        return `${baseClasses} ${mobileClasses} left-full top-1/2 transform -translate-y-1/2 ml-1`;
      default:
        return `${baseClasses} ${mobileClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-1`;
    }
  };

  const getArrowClasses = () => {
    // Use left placement for mobile to prevent cutoff
    const effectivePlacement = isMobile ? 'left' : placement;
    
    switch (effectivePlacement) {
      case 'top':
        return 'absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800';
      case 'bottom':
        return 'absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800';
      case 'left':
        return 'absolute left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800';
      case 'right':
        return 'absolute right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800';
      default:
        return 'absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800';
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      data-tooltip-container
      onMouseEnter={() => !isMobile && setIsVisible(true)}
      onMouseLeave={() => !isMobile && setIsVisible(false)}
    >
      <button
        type="button"
        className="text-dustyRose/60 hover:text-dustyRose transition-colors focus:outline-none focus:ring-2 focus:ring-sageGreen focus:ring-opacity-50 rounded"
        aria-label={`More information: ${content}`}
        onClick={() => isMobile && setIsVisible(!isVisible)}
      >
        {icon}
      </button>
      
      {isVisible && (
        <div className={getTooltipClasses()}>
          {content}
          <div className={getArrowClasses()}></div>
        </div>
      )}
    </div>
  );
}
