import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

export const styles = {
  base: [
    // Base
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-md border text-base/6 font-semibold cursor-pointer',
    // Focus
    'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-skyBlue',
    // Disabled
    'data-[disabled]:opacity-50',
    // Icon
    '[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4',
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    'border-transparent bg-[--btn-border]',
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]',
    // Drop shadow, applied to the inset `before` layer so it blends with the border
    'before:shadow-photo-glue',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]',
    // Inner highlight shadow
    'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
    // White overlay on hover
    'after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
    // Disabled
    'before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none',
  ],
  outline: [
    // Base
    'border-dustyRose/20 text-dustyRose data-[active]:bg-dustyRose/5 data-[hover]:bg-dustyRose/5',
    // Icon
    '[--btn-icon:theme(colors.dustyRose)] data-[active]:[--btn-icon:theme(colors.dustyRose)] data-[hover]:[--btn-icon:theme(colors.dustyRose)]',
  ],
  plain: [
    // Base
    'border-transparent',
  ],
  sizes: {
    base: [
      'px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6',
    ],
    lg: [
      'px-[calc(theme(spacing[6])-1px)] py-[calc(theme(spacing[5])-1px)] sm:px-[calc(theme(spacing[6])-1px)] sm:py-[calc(theme(spacing[4])-1px)] sm:text-base/6',
    ],
    sm: [
      'px-[calc(theme(spacing[3])-1px)] py-[calc(theme(spacing[2])-1px)] sm:px-[calc(theme(spacing[2.5])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-xs/6',
    ],
  },
  colors: {
    primary: [
      'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.dustyRose)] [--btn-border:theme(colors.dustyRose/90%)]',
      '[--btn-icon:theme(colors.white)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
    ],
    secondary: [
      'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sageGreen)] [--btn-border:theme(colors.sageGreen/90%)]',
      '[--btn-icon:theme(colors.white)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
    ],
    ghost: [
      'text-dustyRose [--btn-hover-overlay:theme(colors.dustyRose/5%)] [--btn-bg:transparent] [--btn-border:transparent]',
      '[--btn-icon:theme(colors.dustyRose)] data-[active]:[--btn-icon:theme(colors.dustyRose/80%)] data-[hover]:[--btn-icon:theme(colors.dustyRose/80%)]',
    ],
    danger: [
      'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]',
      '[--btn-icon:theme(colors.white)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
    ],
  },
};

type ButtonProps = {
  color?: keyof typeof styles.colors;
  outline?: boolean;
  plain?: boolean;
  size?: keyof typeof styles.sizes;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<Headless.ButtonProps, 'className' | 'children'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color,
    outline,
    plain,
    className,
    children,
    size,
    loading,
    ...props
  },
  ref
) {
  const classes = clsx(
    className,
    styles.base,
    styles.sizes[size ?? 'base'],
    outline
      ? styles.outline
      : plain
        ? styles.plain
        : clsx(styles.solid, styles.colors[color ?? 'primary']),
  );

  function renderChildrenWithLoading() {
    return (
      <>
        {loading && (
          <div className="absolute inset-0">
            <div className="flex w-full h-full justify-center items-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        )}
        <div className={clsx('contents', { invisible: loading })}>
          {children}
        </div>
      </>
    );
  }

  return (
    <Headless.Button
      {...props}
      className={clsx(classes, 'cursor-default')}
      ref={ref}
      disabled={loading || props.disabled}
    >
      <TouchTarget>{renderChildrenWithLoading()}</TouchTarget>
    </Headless.Button>
  );
});

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
