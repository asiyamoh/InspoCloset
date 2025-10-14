import { useSearch } from '@tanstack/react-router';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchResultsGrid } from './components/SearchResultsGrid';
import { useSearchPictures } from './hooks/useSearchPictures';

export function SearchResultsPage() {
  const { tag, q } = useSearch({ from: '/_authenticated/search-results' });
  const searchTerm = tag || q || '';
  const { pictures, isLoading, error } = useSearchPictures(searchTerm);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Search Results
          </h1>
          <p className="text-sageGreen text-lg">
            {searchTerm ? `Results for "${searchTerm}"` : 'Search for inspiration'}
          </p>
        </div>

        {/* Results Grid */}
        <SearchResultsGrid
          pictures={pictures}
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
        />
      </div>
    </MainLayout>
  );
}
