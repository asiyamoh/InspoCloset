import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { useAuthMutations } from '../../utils/queries/auth.mutations';
import { FormInput } from '../../components/ui/FormInput';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface SignInForm {
  email: string;
  password: string;
}

export function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInPending } = useAuthMutations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = async (data: SignInForm) => {
    try {
      setError(null);
      await signIn(data);
      // Auth state change will handle redirect automatically
    } catch (err) {
      setError('Invalid email or password');
      console.error('Sign in error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-handwritten text-dustyRose">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-sageGreen">
            Sign in to your InspoCloset account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              error={errors.email?.message}
            />

            <FormInput
              {...register('password', { required: 'Password is required' })}
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
            />
          </div>

          {error && (
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-sageGreen hover:text-dustyRose"
            >
              Forgot your password?
            </Link>
          </div>

          <Button 
            type="submit" 
            loading={signInPending}
            className="w-full"
          >
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
            </span>
            <Link
              to="/sign-up"
              className="text-sm text-sageGreen hover:text-dustyRose font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
