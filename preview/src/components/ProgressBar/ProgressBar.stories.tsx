import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'color' },
  },
  args: { label: 'Progress', value: 65 },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0, label: 'Not Started' } };
export const Complete: Story = { args: { value: 100, label: 'Complete' } };
export const CustomColor: Story = { args: { color: '#10b981', label: 'Success' } };
