import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    );
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        // @ts-ignore - DayPicker range select type mismatch
        onSelect={setRange}
        className="rounded-md border shadow"
        captionLayout="dropdown"
      />
    );
  },
};
