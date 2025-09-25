import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

const base = [
  // Base layout
  'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out',
  // Focus
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-skyBlue focus-visible:ring-offset-2',
  // Disabled state
  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
  // Background colors and animation
  'bg-lavenderGray/50 data-[checked]:bg-dustyRose',
  // Scale effect on press
  'active:scale-95',
];

const toggle = [
  // Base layout
  'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow-photo-glue ring-0 transition-all duration-300 ease-in-out',
  // Position with improved animation
  'translate-x-0 data-[checked]:translate-x-5',
  // Scale and rotation effects for better visual feedback
  'data-[checked]:scale-110 data-[checked]:rotate-12 data-[checked]:shadow-photo-glue-md',
  // Inner shadow for depth
  'before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_1px_theme(colors.dustyRose/5%)]',
  // Additional visual effect - subtle inner glow when checked
  'after:absolute after:inset-0 after:rounded-full after:opacity-0 after:bg-dustyRose/10 after:transition-opacity after:duration-300 data-[checked]:after:opacity-100',
];

export interface ToggleProps extends Omit<Headless.SwitchProps, 'className'> {
  className?: string;
  label?: string;
  description?: string;
}

export function Toggle({
  className,
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <div className={clsx('flex items-start space-x-3', className)}>
      <Headless.Switch
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...props}
        className={clsx(base)}
        data-checked={checked || defaultChecked || undefined}
      >
        <span
          aria-hidden="true"
          className={clsx(toggle)}
          data-checked={checked || defaultChecked || undefined}
        />
      </Headless.Switch>
      <div className="flex-1">
        {label && (
          <label className="text-sm font-medium text-sageGreen cursor-pointer">
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-dustyRose/70 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

export function ToggleGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,
        'space-y-3',
        'has-[[data-slot=description]]:space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:font-medium',
      )}
    />
  );
}

export function ToggleField({
  className,
  ...props
}: { className?: string } & Omit<Headless.FieldProps, 'className'>) {
  return (
    <Headless.Field
      data-slot="field"
      {...props}
      className={clsx(
        className,
        // Base layout
        'grid grid-cols-[3rem_1fr] items-center gap-x-4 gap-y-1',
        // Control layout
        '[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:justify-self-center',
        // Label layout
        '[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start',
        // Description layout
        '[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2',
        // With description
        '[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium',
      )}
    />
  );
}
