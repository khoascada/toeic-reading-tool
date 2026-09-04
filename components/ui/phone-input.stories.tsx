import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './phone-input';
import React from 'react';

const meta: Meta<typeof PhoneInput> = {
  title: 'UI/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('');
    return <PhoneInput {...args} value={value} onChange={(val) => setValue(val)} />;
  },
};

export const PreFilledUnitedStates: Story = {
  args: {
    value: '+12025550123',
    defaultCountry: 'US',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '+84123456789',
  },
};
