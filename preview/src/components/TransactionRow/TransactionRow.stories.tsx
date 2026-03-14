import type { Meta, StoryObj } from '@storybook/react';
import { TransactionRow } from './TransactionRow';
import { AllVariantsGrid } from '../../storybook';

const meta = {
  title: 'Components/TransactionRow',
  component: TransactionRow,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['credit', 'debit'] },
  },
  args: {
    title: 'Payment Received',
    category: 'Income',
    amount: '+$1,200.00',
    date: 'Mar 14, 2026',
    type: 'credit',
  },
} satisfies Meta<typeof TransactionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Credit: Story = { args: { type: 'credit' } };
export const Debit: Story = { args: { type: 'debit', title: 'Coffee Shop', category: 'Food', amount: '-$4.50' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={TransactionRow}
      axes={[{ prop: 'type', values: ['credit', 'debit'] }]}
      baseProps={{ title: 'Transaction', category: 'General', amount: '$100', date: 'Today' }}
    />
  ),
};
