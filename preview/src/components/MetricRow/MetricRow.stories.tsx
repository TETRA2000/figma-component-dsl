import type { Meta, StoryObj } from '@storybook/react';
import { MetricRow } from './MetricRow';

const meta = {
  title: 'Components/MetricRow',
  component: MetricRow,
  tags: ['autodocs'],
  args: { label: 'Active Users', value: '1,234', subValue: '+12%' },
} satisfies Meta<typeof MetricRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCustomColor: Story = { args: { dotColor: '#10b981' } };
export const NoSubValue: Story = { args: { subValue: undefined, label: 'Total Revenue', value: '$48,250' } };
