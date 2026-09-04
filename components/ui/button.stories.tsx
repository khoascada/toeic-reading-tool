import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Mail, Loader2, ChevronRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'link'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
        'info',
        'reset',
        'cancel',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'sm', 'lg', 'icon'],
    },
    shape: {
      control: 'select',
      options: ['default', 'circle'],
    },
    loading: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    color: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'default',
    color: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'default',
    color: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    color: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Please wait',
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <ChevronRight className="h-4 w-4" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="small">Small</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button shape="default">Default Shape</Button>
      <Button shape="circle" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  ),
};
