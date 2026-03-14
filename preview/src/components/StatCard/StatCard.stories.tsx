import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { AllVariantsGrid } from '../../storybook';

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down'] },
  },
  args: {
    label: 'Revenue',
    value: '$12,345',
    change: '+12.5%',
    trend: 'up',
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TrendUp: Story = { args: { trend: 'up' } };
export const TrendDown: Story = { args: { trend: 'down', change: '-3.2%' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={StatCard}
      axes={[{ prop: 'trend', values: ['up', 'down'] }]}
      baseProps={{ label: 'Revenue', value: '$12,345', change: '+12.5%' }}
    />
  ),
};
