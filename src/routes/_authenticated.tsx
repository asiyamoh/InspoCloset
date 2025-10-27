import { createFileRoute, Outlet } from '@tanstack/react-router';
import { authGuard } from '../utils/auth/auth-guard';
import { useAuthContext } from '../utils/auth/use-auth-context';
import { AuthInitializing, ProfileLoading } from '../utils/auth/auth-loading.component';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => authGuard(),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { loading: authLoading, profileLoading } = useAuthContext();

  // Show auth loading states as a safety net
  // (The auth guard should handle this, but this provides extra protection)
  if (authLoading) {
    return <AuthInitializing />;
  }

  if (profileLoading) {
    return <ProfileLoading />;
  }

  return <Outlet />;
}