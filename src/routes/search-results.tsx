import { createFileRoute } from '@tanstack/react-router';
import { SearchResultsPage } from '../features/search/search-results.page';

export const Route = createFileRoute('/search-results')({
  component: SearchResultsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    tag: (search.tag as string) || '',
    q: (search.q as string) || '',
  }),
});