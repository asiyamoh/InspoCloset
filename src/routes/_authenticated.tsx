import { createFileRoute, Outlet } from '@tanstack/react-router';
import { authGuard } from '../utils/auth/auth-guard';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => authGuard(),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}