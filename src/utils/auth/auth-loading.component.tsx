
interface AuthLoadingProps {
  message?: string;
  showSpinner?: boolean;
}

export function AuthLoading({ 
  message = "Loading...", 
  showSpinner = true 
}: AuthLoadingProps) {
  return (
    <div className="min-h-screen bg-ivoryCream flex items-center justify-center">
      <div className="text-center space-y-4">
        {showSpinner && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dustyRose"></div>
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-xl font-handwritten text-dustyRose">
            {message}
          </h2>
          <p className="text-sageGreen text-sm">
            Please wait while we set up your account...
          </p>
        </div>
      </div>
    </div>
  );
}

// Specific loading states for different auth scenarios
export function AuthInitializing() {
  return (
    <AuthLoading 
      message="Initializing your session..." 
      showSpinner={true}
    />
  );
}

export function ProfileLoading() {
  return (
    <AuthLoading 
      message="Loading your profile..." 
      showSpinner={true}
    />
  );
}

export function EmailConfirmationLoading() {
  return (
    <AuthLoading 
      message="Verifying your email..." 
      showSpinner={true}
    />
  );
}
