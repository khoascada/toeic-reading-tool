'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@lib/utils';

const Tabs = TabsPrimitive.Root;

type TabsListVariant = 'default' | 'line';

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsListVariant;
}

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-muted rounded-lg',
      line: 'gap-2 bg-transparent p-0',
    };

    return (
      <TabsPrimitive.List
        ref={ref}
        data-variant={variant}
        className={cn(
          'text-muted-foreground inline-flex h-9 items-center justify-center',
          'group/tabs-list w-fit',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all',
      'relative',
      // Focus states
      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      // Disabled states
      'disabled:pointer-events-none disabled:opacity-50',

      // Default variant styles
      'group-data-[variant=default]/tabs-list:ring-offset-background',
      'group-data-[variant=default]/tabs-list:data-[state=active]:bg-background',
      'group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground',
      'group-data-[variant=default]/tabs-list:data-[state=active]:shadow',

      // Line variant styles
      'group-data-[variant=line]/tabs-list:rounded-none',
      'group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:border-transparent',
      'group-data-[variant=line]/tabs-list:text-muted-foreground',
      'group-data-[variant=line]/tabs-list:hover:text-foreground',
      // Line variant active state - bold text + underline
      'group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground',
      'group-data-[variant=line]/tabs-list:data-[state=active]:font-semibold',
      'group-data-[variant=line]/tabs-list:data-[state=active]:border-primary',

      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
