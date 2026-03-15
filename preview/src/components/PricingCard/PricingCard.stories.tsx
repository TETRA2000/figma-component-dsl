import type { Meta, StoryObj } from '@storybook/react';
import { PricingCard } from './PricingCard';
import { createDslParameters } from '../../storybook';

const meta = {
  title: 'Components/PricingCard',
  component: PricingCard,
  tags: ['autodocs'],
  parameters: { dsl: createDslParameters('PricingCard') },
  argTypes: {
    highlighted: { control: 'boolean' },
  },
  args: {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams',
    features: ['10 users', '50GB storage', 'Priority support', 'Advanced analytics'],
    cta: 'Get Started',
  },
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Highlighted: Story = { args: { highlighted: true } };
export const Enterprise: Story = {
  args: {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: ['Unlimited users', '1TB storage', '24/7 support', 'Custom integrations', 'SLA'],
    highlighted: true,
  },
};
