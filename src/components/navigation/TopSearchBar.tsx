import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSearch } from '../../hooks/useSearch';
import { SearchDropdown } from '../search/SearchDropdown';
import { TagSearchResult } from '../../types/search.types';

export function TopSearchBar({
  placeholder = 'Search for tags...',
  className,
  ...props
}: {
  placeholder?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { results, isLoading, error, searchTags, clearResults } = useSearch();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchTags(searchTerm);
        setShowDropdown(true);
      }, 300);
    } else {
      clearResults();
      setShowDropdown(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, searchTags, clearResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: TagSearchResult) => {
    // Navigate to search results page with the selected tag
    navigate({
      to: '/search-results',
      search: { tag: result.name, q: '' }
    });
    setShowDropdown(false);
    setSearchTerm('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // Navigate to search results page with the current search term
      navigate({
        to: '/search-results',
        search: { tag: '', q: searchTerm.trim() }
      });
      setShowDropdown(false);
      setSearchTerm('');
    }
  };

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
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="block w-full p-3 pl-10 text-sm text-sageGreen bg-champagneBeige/50 border border-dustyRose/30 rounded-lg focus:ring-skyBlue focus:border-skyBlue placeholder-dustyRose/60"
        placeholder={placeholder}
        {...props}
      />

      {/* Search dropdown */}
      {showDropdown && (
        <SearchDropdown
          results={results}
          isLoading={isLoading}
          error={error}
          onResultClick={handleResultClick}
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
} 