import clsx from 'clsx';

export function TopSearchBar({
  placeholder = 'Search for bridal inspiration...',
  className,
  ...props
}: {
  placeholder?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>) {
  return (
    <div className={clsx('relative w-full', className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-dustyRose"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        className="block w-full p-3 pl-10 text-sm text-sageGreen bg-champagneBeige/50 border border-dustyRose/30 rounded-lg focus:ring-skyBlue focus:border-skyBlue placeholder-dustyRose/60"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
} 