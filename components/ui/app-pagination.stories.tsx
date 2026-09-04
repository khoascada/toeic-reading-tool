import type { Meta, StoryObj } from '@storybook/react';
import { AppPagination } from './app-pagination';

const meta: Meta<typeof AppPagination> = {
  title: 'UI/AppPagination',
  component: AppPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    onPageChange: { action: 'onPageChange' },
  },
};

export default meta;
type Story = StoryObj<typeof AppPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};
