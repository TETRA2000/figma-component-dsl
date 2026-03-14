import type { Meta, StoryObj } from '@storybook/react';
import { AccountSelector } from './AccountSelector';

const meta = {
  title: 'Components/AccountSelector',
  component: AccountSelector,
  tags: ['autodocs'],
  args: {
    accounts: [
      { label: 'Checking ****4521', active: true },
      { label: 'Savings ****8832' },
      { label: 'Business ****1100' },
    ],
  },
} satisfies Meta<typeof AccountSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleAccount: Story = { args: { accounts: [{ label: 'Main Account', active: true }] } };
