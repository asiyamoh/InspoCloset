import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export function BottomNavigation({
  ariaLabel = 'Bottom navigation',
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'nav'> & { ariaLabel?: string }) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx(
        'fixed bottom-0 left-0 z-50 w-full h-16 bg-ivoryCream border-t border-dustyRose/30 shadow-photo-glue-md',
        className
      )}
      {...props}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {children}
      </div>
    </nav>
  );
}

export function BottomNavigationItem({
  icon,
  label,
  href,
  onClick,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const Wrapper = href ? 'a' : 'button';

  return (
    <Wrapper
      {...(href ? { href } : {})}
      {...(onClick ? { onClick } : {})}
      className={clsx(
        'flex flex-col items-center justify-center w-full h-full hover:bg-champagneBeige/30 group',
        active && 'text-skyBlue'
      )}
    >
      <div
        className={clsx(
          'w-5 h-5 mb-1 text-dustyRose group-hover:text-skyBlue flex items-center justify-center',
          active && 'text-skyBlue'
        )}
      >
        {icon}
      </div>
      <span
        className={clsx(
          'text-sm text-dustyRose group-hover:text-skyBlue',
          active && 'text-skyBlue'
        )}
      >
        {label}
      </span>
    </Wrapper>
  );
}
