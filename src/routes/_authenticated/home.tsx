import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '../../features/home/home.page';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
}); 