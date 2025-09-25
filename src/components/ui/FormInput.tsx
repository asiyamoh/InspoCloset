import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

export function InputGroup({
  children,
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="control"
      className={clsx(
        'relative isolate block',
        '[&_input]:has-[[data-slot=icon]:first-child]:pl-10 [&_input]:has-[[data-slot=icon]:last-child]:pr-10 sm:[&_input]:has-[[data-slot=icon]:first-child]:pl-8 sm:[&_input]:has-[[data-slot=icon]:last-child]:pr-8',
        '[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4',
        '[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
        '[&>[data-slot=icon]]:text-dustyRose/60',
      )}
    >
      {children}
    </span>
  );
}

export const FormInput = forwardRef<HTMLInputElement, {
  label?: string;
  error?: string;
  className?: string;
} & Omit<Headless.InputProps, 'className'>>(function FormInput(
  {
    label,
    error,
    className,
    ...props
  },
  ref
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-champagneBeige/50 before:shadow-photo-glue',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-skyBlue',
        // Disabled state
        'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-dustyRose/5 before:has-[[data-disabled]]:shadow-none',
        // Invalid state
        'before:has-[[data-invalid]]:shadow-red-500/10',
      ])}
    >
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-sageGreen">
            {label}
            {props.required && <span className="text-dustyRose ml-1">*</span>}
          </label>
        )}
        <Headless.Input
          ref={ref}
          {...props}
          className={clsx([
            // Basic layout
            'relative block w-full appearance-none py-2 px-3 w-full',
            // Typography
            'text-base/6 text-sageGreen placeholder:text-dustyRose/60 sm:text-sm/6',
            // Border
            'border border-dustyRose/30 data-[hover]:border-dustyRose/50 rounded-md',
            // Background color
            'bg-transparent',
            // Hide default focus styles
            'focus:outline-none',
            // Invalid state
            'data-[invalid]:border-dustyRose data-[invalid]:data-[hover]:border-dustyRose',
            // Disabled state
            'data-[disabled]:border-dustyRose/20',
          ])}
        />
        {error && (
          <p className="text-xs text-dustyRose">{error}</p>
        )}
      </div>
    </span>
  );
});
