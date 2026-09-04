import type { Meta, StoryObj } from '@storybook/react';
import { PageLoading } from './page-loading';

const meta: Meta<typeof PageLoading> = {
  title: 'UI/PageLoading',
  component: PageLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageLoading>;

export const Default: Story = {};
