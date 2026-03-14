import type { Meta, StoryObj } from '@storybook/react';
import { PricingTier } from './PricingTier';

const meta = {
  title: 'Components/PricingTier',
  component: PricingTier,
  tags: ['autodocs'],
  argTypes: {
    highlighted: { control: 'boolean' },
  },
  args: {
    name: 'Starter',
    price: '$9',
    period: '/mo',
    features: ['5 users', '10GB storage', 'Email support'],
  },
} satisfies Meta<typeof PricingTier>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Highlighted: Story = { args: { highlighted: true, name: 'Pro', price: '$29' } };
