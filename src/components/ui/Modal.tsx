import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import type React from 'react';

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
};

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'lg',
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Headless.Dialog open={isOpen} onClose={onClose}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-dustyRose/25 px-2 py-2 transition duration-100 focus:outline-0 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16"
      />

      <div className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <Headless.DialogPanel
            transition
            className={clsx(
              className,
              sizes[size],
              'row-start-2 w-full min-w-0 rounded-t-md bg-white p-[--gutter] shadow-photo-glue-md ring-1 ring-dustyRose/20 [--gutter:theme(spacing.8)] sm:mb-auto sm:rounded-md forced-colors:outline',
              'transition duration-100 data-[closed]:translate-y-12 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:data-[closed]:translate-y-0 sm:data-[closed]:data-[enter]:scale-95',
            )}
          >
            {children}
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  );
}

export function ModalTitle({
  className,
  children,
  ...props
}: { className?: string; children: React.ReactNode } & Omit<Headless.DialogTitleProps, 'className'>) {
  return (
    <Headless.DialogTitle
      {...props}
      className={clsx(
        className,
        'text-balance text-lg/6 font-handwritten text-dustyRose sm:text-base/6',
      )}
    >
      {children}
    </Headless.DialogTitle>
  );
}

export function ModalDescription({
  className,
  children,
  ...props
}: { className?: string; children: React.ReactNode } & Omit<Headless.DescriptionProps, 'className'>) {
  return (
    <Headless.Description
      {...props}
      className={clsx(className, 'mt-2 text-pretty text-sageGreen')}
    >
      {children}
    </Headless.Description>
  );
}

export function ModalBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'mt-6')} />;
}

export function ModalActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto',
      )}
    />
  );
}
