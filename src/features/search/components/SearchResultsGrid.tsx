import { SearchPicture } from '../../../types/search.types';

interface SearchResultsGridProps {
  pictures: SearchPicture[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}

export function SearchResultsGrid({ pictures, isLoading, error, searchTerm }: SearchResultsGridProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-sageGreen text-lg">Searching for "{searchTerm}"...</div>
        <div className="mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dustyRose"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Error: {error}</div>
        <div className="text-dustyRose/60 mt-2">Please try again</div>
      </div>
    );
  }

  if (pictures.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-dustyRose/60 text-lg">No pictures found for "{searchTerm}"</div>
        <div className="text-sageGreen mt-2">Try searching for a different tag</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="text-center">
        <div className="text-sageGreen">
          Found {pictures.length} {pictures.length === 1 ? 'picture' : 'pictures'}
        </div>
      </div>

      {/* Pictures Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pictures.map((picture) => (
          <div
            key={picture.id}
            className="aspect-square rounded-lg overflow-hidden bg-champagneBeige/30 border border-dustyRose/20 hover:border-dustyRose/40 transition-colors cursor-pointer group"
          >
            <img
              src={picture.thumbnailUrl || picture.url}
              alt={`Search result for ${searchTerm}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
