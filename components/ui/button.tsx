import * as React from 'react';
import { Spinner } from './spinner';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2
  whitespace-nowrap rounded-md text-sm !font-semibold transition-colors
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4
  [&_svg]:shrink-0 hover:cursor-pointer `,
  {
    variants: {
      variant: {
        default: 'shadow',
        outline: 'border bg-transparent shadow-sm',
        ghost: 'bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline',
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        destructive: '',
        success: '',
        warning: '',
        info: '',
        reset: '',
        cancel: '',
      },
      size: {
        default: 'h-9 px-4 py-2',
        small: 'h-7 px-3 py-1',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10.5 rounded-md px-4',
        icon: 'h-10 w-10',
      },
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full',
      },
    },
    compoundVariants: [
      // variant: default
      {
        variant: 'default',
        color: 'default',
        class: 'bg-accent text-accent-foreground hover:bg-accent/80',
      },
      {
        variant: 'default',
        color: 'primary',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        variant: 'default',
        color: 'secondary',
        class: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      },
      {
        variant: 'default',
        color: 'destructive',
        class: 'bg-destructive text-white hover:bg-destructive/90',
      },
      { variant: 'default', color: 'success', class: 'bg-success text-white hover:bg-success/90' },
      { variant: 'default', color: 'warning', class: 'bg-warning text-white hover:bg-warning/90' },
      { variant: 'default', color: 'info', class: 'bg-info text-white hover:bg-info/90' },
      { variant: 'default', color: 'reset', class: 'bg-reset text-text-reset hover:bg-reset/90' },
      { variant: 'default', color: 'cancel', class: 'bg-cancel text-white hover:bg-cancel/90' },

      // variant: outline
      {
        variant: 'outline',
        color: 'default',
        class: 'hover:bg-accent hover:text-accent-foreground',
      },
      {
        variant: 'outline',
        color: 'primary',
        class: 'border-primary text-primary hover:bg-primary/10',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class: 'border-secondary text-secondary hover:bg-secondary/10',
      },
      {
        variant: 'outline',
        color: 'destructive',
        class: 'border-destructive text-destructive hover:bg-destructive/10',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'border-success text-success hover:bg-success/10',
      },
      {
        variant: 'outline',
        color: 'warning',
        class: 'border-warning text-warning hover:bg-warning/10',
      },
      { variant: 'outline', color: 'info', class: 'border-info text-info hover:bg-info/10' },
      { variant: 'outline', color: 'reset', class: 'border-reset text-reset hover:bg-reset/10' },
      {
        variant: 'outline',
        color: 'cancel',
        class: 'border-cancel text-cancel hover:bg-cancel/10',
      },

      // variant: ghost
      { variant: 'ghost', color: 'default', class: 'hover:text-accent-foreground hover:bg-accent' },
      { variant: 'ghost', color: 'primary', class: 'text-primary hover:bg-primary/10' },
      { variant: 'ghost', color: 'secondary', class: 'text-secondary hover:bg-secondary/10' },
      { variant: 'ghost', color: 'destructive', class: 'text-destructive hover:bg-destructive/10' },
      { variant: 'ghost', color: 'success', class: 'text-success hover:bg-success/10' },
      { variant: 'ghost', color: 'warning', class: 'text-warning hover:bg-warning/10' },
      { variant: 'ghost', color: 'info', class: 'text-info hover:bg-info/10' },
      { variant: 'ghost', color: 'reset', class: 'text-reset hover:bg-reset/10' },
      { variant: 'ghost', color: 'cancel', class: 'text-cancel hover:bg-cancel/10' },

      // variant: link
      { variant: 'link', color: 'default', class: 'hover:text-accent-foreground' },
      { variant: 'link', color: 'primary', class: 'text-primary' },
      { variant: 'link', color: 'secondary', class: 'text-secondary' },
      { variant: 'link', color: 'destructive', class: 'text-destructive' },
      { variant: 'link', color: 'success', class: 'text-success' },
      { variant: 'link', color: 'warning', class: 'text-warning' },
      { variant: 'link', color: 'info', class: 'text-info' },
      { variant: 'link', color: 'reset', class: 'text-reset' },
      { variant: 'link', color: 'cancel', class: 'text-cancel' },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'default',
      shape: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      shape,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, color, size, shape, className }))}
          ref={ref}
          {...props}
          disabled
        >
          <Spinner className="size-4 animate-spin" />
          {children}
        </Comp>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, shape, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
