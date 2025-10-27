import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabase/supabase-client';
import { useAuthContext } from './use-auth-context';
import { MainLayout } from '../../components/layout/MainLayout';

export function EmailConfirmationPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleResendEmail = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    setResendMessage('');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      if (error) {
        setResendMessage('Failed to resend email. Please try again.');
        console.error('Resend error:', error);
      } else {
        setResendMessage('Confirmation email sent! Please check your inbox.');
      }
    } catch (error) {
      setResendMessage('Failed to resend email. Please try again.');
      console.error('Resend error:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckConfirmation = async () => {
    setIsChecking(true);
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session check error:', error);
        return;
      }
      
      if (session?.user?.email_confirmed_at) {
        // Email is confirmed, redirect to home
        navigate({ to: '/home' });
      } else {
        setResendMessage('Email not confirmed yet. Please check your inbox and click the confirmation link.');
      }
    } catch (error) {
      console.error('Confirmation check error:', error);
      setResendMessage('Failed to check confirmation status. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/sign-in' });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-ivoryCream flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-dustyRose/10 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="h-8 w-8 text-dustyRose" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h1 className="text-2xl font-handwritten text-dustyRose mb-2">
              Confirm Your Email
            </h1>
            <p className="text-sageGreen">
              We've sent a confirmation link to:
            </p>
            <p className="text-dustyRose font-medium mt-2">
              {user?.email}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-4 border border-dustyRose/20">
              <h3 className="text-lg font-medium text-dustyRose mb-2">
                What to do next:
              </h3>
              <ol className="text-sm text-sageGreen space-y-1 list-decimal list-inside">
                <li>Check your email inbox</li>
                <li>Look for an email from InspoCloset</li>
                <li>Click the confirmation link</li>
                <li>Return here and click "I've confirmed my email"</li>
              </ol>
            </div>

            {resendMessage && (
              <div className={`p-3 rounded-lg text-sm ${
                resendMessage.includes('sent') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {resendMessage}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleCheckConfirmation}
                disabled={isChecking}
                className="w-full bg-dustyRose text-white py-3 px-4 rounded-lg font-medium hover:bg-dustyRose/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isChecking ? 'Checking...' : "I've confirmed my email"}
              </button>

              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-sageGreen text-white py-3 px-4 rounded-lg font-medium hover:bg-sageGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? 'Sending...' : 'Resend confirmation email'}
              </button>

              <button
                onClick={handleSignOut}
                className="w-full text-dustyRose py-3 px-4 rounded-lg font-medium hover:bg-dustyRose/10 transition-colors"
              >
                Sign out and use different email
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-sageGreen">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
