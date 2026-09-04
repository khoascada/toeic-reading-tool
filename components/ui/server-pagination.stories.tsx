import type { Meta, StoryObj } from '@storybook/react';
import { ServerPagination } from './server-pagination';

const meta: Meta<typeof ServerPagination> = {
  title: 'UI/ServerPagination',
  component: ServerPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ServerPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    createPageUrl: (page: number) => `?page=${page}`,
  },
};
