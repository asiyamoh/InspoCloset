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
        'fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600',
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
        'flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
        active && 'text-blue-600 dark:text-blue-500'
      )}
    >
      <div
        className={clsx(
          'w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 flex items-center justify-center',
          active && 'text-blue-600 dark:text-blue-500'
        )}
      >
        {icon}
      </div>
      <span
        className={clsx(
          'text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500',
          active && 'text-blue-600 dark:text-blue-500'
        )}
      >
        {label}
      </span>
    </Wrapper>
  );
}
