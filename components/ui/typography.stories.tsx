import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
        'overline',
        'subtitle1',
        'subtitle2',
        'button',
      ],
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'inherit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1">Body 1 (Default)</Typography>
      <Typography variant="body2">Body 2</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
      <Typography variant="button">Button text</Typography>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography textColor="primary">Primary Color Text</Typography>
      <Typography textColor="secondary">Secondary Color Text</Typography>
      <Typography textColor="disabled">Disabled Color Text</Typography>
    </div>
  ),
};
