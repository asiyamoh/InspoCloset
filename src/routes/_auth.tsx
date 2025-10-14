import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router';
import { useAuthContext } from '../utils/auth/use-auth-context';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  const { session, loading } = useAuthContext();
  
  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sageGreen">Loading...</div>
      </div>
    );
  }
  
  // Redirect to home if user is already authenticated
  if (session) {
    return <Navigate to="/home" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}