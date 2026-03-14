import type { Meta, StoryObj } from '@storybook/react';
import { BalanceCard } from './BalanceCard';

const meta = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
  tags: ['autodocs'],
  args: {
    accountName: 'Checking Account',
    accountNumber: '****4521',
    balance: '$12,345.67',
  },
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Savings: Story = { args: { accountName: 'Savings Account', accountNumber: '****8832', balance: '$45,000.00', currency: 'EUR' } };
