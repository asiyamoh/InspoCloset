import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export function BottomNavigation({
  ariaLabel = 'Bottom navigation',
  children,
  className,
  gridCols = 'grid-cols-3',
  ...props
}: ComponentPropsWithoutRef<'nav'> & { 
  ariaLabel?: string;
  gridCols?: 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4' | 'grid-cols-5';
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx(
        'fixed bottom-0 left-0 z-50 w-full h-16 bg-ivoryCream border-t border-dustyRose/30 shadow-photo-glue-md',
        className
      )}
      {...props}
    >
      <div className={clsx('grid h-full max-w-lg mx-auto font-medium', gridCols)}>
        {children}
      </div>
    </nav>
  );
}

export function BottomNavigationItem({
  icon,
  label,
  onClick,
  active = false,
  disabled = false,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex flex-col items-center justify-center w-full h-full hover:bg-champagneBeige/30 group',
        active && 'text-skyBlue',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div
        className={clsx(
          'w-5 h-5 mb-1 text-dustyRose group-hover:text-skyBlue flex items-center justify-center',
          active && 'text-skyBlue',
          disabled && 'text-dustyRose/50'
        )}
      >
        {typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.includes('.')) ? (
          <img 
            src={icon} 
            alt="Folder icon"
            className="w-5 h-5 rounded object-cover"
          />
        ) : (
          icon
        )}
      </div>
      <span
        className={clsx(
          'text-sm text-dustyRose group-hover:text-skyBlue',
          active && 'text-skyBlue',
          disabled && 'text-dustyRose/50'
        )}
      >
        {label}
      </span>
    </button>
  );
}
