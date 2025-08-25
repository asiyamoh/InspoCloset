import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navigate } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <Navigate to="/home" replace />,
}); 