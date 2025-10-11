import { useEffect, useRef } from 'react';
import { SearchResults } from './SearchResults';
import { TagSearchResult } from '../../types/search.types';

interface SearchDropdownProps {
  results: TagSearchResult[];
  isLoading: boolean;
  error: string | null;
  onResultClick: (result: TagSearchResult) => void;
  onClose: () => void;
}

export function SearchDropdown({ 
  results, 
  isLoading, 
  error, 
  onResultClick, 
  onClose 
}: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-ivoryCream border border-dustyRose/30 rounded-lg shadow-lg z-50"
    >
      <SearchResults
        results={results}
        isLoading={isLoading}
        error={error}
        onResultClick={onResultClick}
      />
    </div>
  );
}
