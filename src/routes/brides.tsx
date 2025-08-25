import { createFileRoute } from '@tanstack/react-router';
import { BridesPage } from '../features/bride/brides.page';

export const Route = createFileRoute('/brides')({
  component: BridesPage,
}); 