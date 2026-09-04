import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './autocomplete';
import React from 'react';

const meta: Meta<typeof Autocomplete> = {
  title: 'UI/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={options.filter((o) => o.label.toLowerCase().includes(value.toLowerCase()))}
        placeholder="Search fruits..."
      />
    );
  },
};

export const Loading: Story = {
  args: {
    value: '',
    onChange: () => {},
    options: [],
    isLoading: true,
    placeholder: 'Loading...',
  },
};

export const Empty: Story = {
  args: {
    value: 'xyz',
    onChange: () => {},
    options: [],
    emptyMessage: 'No fruits found',
    placeholder: 'Search fruits...',
  },
};
