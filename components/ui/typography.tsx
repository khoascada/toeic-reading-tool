import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-7xl font-extrabold leading-tight tracking-tight',
      h2: 'text-4xl font-semibold leading-tight tracking-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-lg font-semibold leading-snug',
      h5: 'text-base font-semibold leading-normal',
      h6: 'text-sm font-normal leading-normal',
      body1: 'text-base font-normal leading-normal',
      body2: 'text-sm font-normal leading-relaxed',
      caption: 'text-xs font-semibold leading-relaxed tracking-wide',
      overline: 'text-xs font-normal italic leading-relaxed tracking-widest uppercase',
      subtitle1: 'text-base font-medium leading-normal',
      subtitle2: 'text-sm font-medium leading-relaxed',
      button: 'text-sm font-medium leading-relaxed tracking-wide',
    },
    textColor: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      disabled: 'text-disabled',
      inherit: 'text-inherit',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});

// Helper to get default HTML element based on variant
function getDefaultComponent(
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'button'
    | null
): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'body1':
    case 'body2':
    case 'subtitle1':
    case 'subtitle2':
      return 'p';
    case 'caption':
    case 'overline':
    case 'button':
      return 'span';
    default:
      return 'p';
  }
}

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, textColor, component, ...props }, ref) => {
    const classes = cn(typographyVariants({ variant, textColor }), className);
    const Element = component || getDefaultComponent(variant || null);

    // Use switch to avoid dynamic component creation warning
    switch (Element) {
      case 'h1':
        return <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'h2':
        return <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'h3':
        return <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'h4':
        return <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'h5':
        return <h5 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'h6':
        return <h6 ref={ref as React.Ref<HTMLHeadingElement>} className={classes} {...props} />;
      case 'p':
        return <p ref={ref as React.Ref<HTMLParagraphElement>} className={classes} {...props} />;
      case 'span':
        return <span ref={ref as React.Ref<HTMLSpanElement>} className={classes} {...props} />;
      default:
        // For custom components - ref is not supported in default case
        // If ref is needed, use a specific variant or pass component prop with forwardRef
        return React.createElement(Element, { ...props, className: classes });
    }
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
