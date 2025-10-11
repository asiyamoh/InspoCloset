import { TagSearchResult } from '../../types/search.types';

interface SearchResultsProps {
  results: TagSearchResult[];
  isLoading: boolean;
  error: string | null;
  onResultClick: (result: TagSearchResult) => void;
}

export function SearchResults({ results, isLoading, error, onResultClick }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="text-sageGreen">Searching...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-dustyRose/60">No tags found</div>
      </div>
    );
  }

  return (
    <div className="max-h-64 overflow-y-auto">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onResultClick(result)}
          className="p-3 hover:bg-champagneBeige/30 cursor-pointer border-b border-dustyRose/10 last:border-b-0"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-sageGreen">{result.name}</div>
              <div className="text-sm text-dustyRose/60">
                {result.pictureCount} {result.pictureCount === 1 ? 'picture' : 'pictures'}
              </div>
            </div>
            {result.pictures.length > 0 && result.pictures[0].thumbnailUrl && (
              <img
                src={result.pictures[0].thumbnailUrl}
                alt={result.name}
                className="w-8 h-8 rounded object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
