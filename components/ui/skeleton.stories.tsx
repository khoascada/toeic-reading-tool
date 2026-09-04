import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" {...args} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" {...args} />
        <Skeleton className="h-4 w-[200px]" {...args} />
      </div>
    </div>
  ),
};

export const Avatar: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const TextLine: Story = {
  args: {
    className: 'h-4 w-full',
  },
};

export const Card: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" {...args} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" {...args} />
        <Skeleton className="h-4 w-[250px]" {...args} />
      </div>
    </div>
  ),
};
