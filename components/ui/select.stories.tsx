import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

// ---- Wrapper for Storybook ----
const SelectWrapper = ({
  size,
  ...props
}: React.ComponentProps<typeof Select> & { size?: 'default' | 'small' }) => (
  <Select {...props}>
    <SelectTrigger size={size} className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

const meta: Meta<typeof SelectWrapper> = {
  title: 'UI/Select',
  component: SelectWrapper,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectWrapper>;

export const Default: Story = {
  args: {
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
