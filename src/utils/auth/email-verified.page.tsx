import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabase/supabase-client';
import { useAuthContext } from './use-auth-context';

export function EmailVerifiedPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check URL for error query parameters (Supabase adds these for invalid/expired links)
    const urlParams = new URLSearchParams(window.location.search);
    let error = urlParams.get('error');
    let errorDescription = urlParams.get('error_description');

    // Also check hash fragments as fallback (Supabase uses these when redirect URL isn't allowed)
    if (!error && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      error = hashParams.get('error') || error;
      errorDescription = hashParams.get('error_description') || errorDescription;
    }

    if (error) {
      setHasError(true);
      setErrorMessage(
        errorDescription || 
        'This verification link is invalid or has expired.'
      );
      setIsLoading(false);
      return;
    }

    // Check if user is signed in and email is confirmed
    const checkVerificationStatus = async () => {
      try {
        const { data: { session: currentSession }, error: sessionError } = 
          await supabase.auth.getSession();
        
        if (sessionError) {
          setHasError(true);
          setErrorMessage('Unable to verify your email. Please try again.');
          setIsLoading(false);
          return;
        }

        // If we have a session and email is confirmed, it's a success
        if (currentSession?.user?.email_confirmed_at) {
          setHasError(false);
        } else {
          // Session exists but email not confirmed - shouldn't happen but handle it
          setHasError(true);
          setErrorMessage('Email verification was not completed. Please try again.');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
        setHasError(true);
        setErrorMessage('An error occurred while verifying your email.');
      } finally {
        setIsLoading(false);
      }
    };

    checkVerificationStatus();
  }, []);

  const handleGoToSignIn = () => {
    navigate({ to: '/sign-in' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivoryCream flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-dustyRose/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="animate-spin h-8 w-8 text-dustyRose"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-sageGreen">Verifying your email...</p>
        </div>
      </div>
    );
  }

  // Error state - invalid or expired link
  if (hasError) {
    return (
      <div className="min-h-screen bg-ivoryCream flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-handwritten text-dustyRose mb-2">
              Verification Link Invalid
            </h1>
            <p className="text-sageGreen">
              {errorMessage}
            </p>
          </div>

          <div className="bg-white/50 rounded-lg p-4 border border-dustyRose/20">
            <p className="text-sm text-sageGreen mb-4">
              The verification link you used is invalid or has expired. To resend a new verification email, please sign in to your account.
            </p>
          </div>

          <button
            onClick={handleGoToSignIn}
            className="w-full bg-dustyRose text-white py-3 px-4 rounded-lg font-medium hover:bg-dustyRose/90 transition-colors"
          >
            Sign In to Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  // Success state - email verified and user signed in
  return (
    <div className="min-h-screen bg-ivoryCream flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-handwritten text-dustyRose mb-2">
            Email Verified!
          </h1>
          <p className="text-sageGreen">
            Thank you for verifying your email address.
          </p>
          {user?.email && (
            <p className="text-dustyRose font-medium mt-2">
              {user.email}
            </p>
          )}
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-dustyRose/20">
          <p className="text-sm text-sageGreen text-center">
            Your account has been successfully verified. You can now access all features of InspoCloset.
          </p>
        </div>

        <button
          onClick={handleGoToSignIn}
          className="w-full bg-dustyRose text-white py-3 px-4 rounded-lg font-medium hover:bg-dustyRose/90 transition-colors"
        >
          Continue to Sign In
        </button>

      </div>
    </div>
  );
}

