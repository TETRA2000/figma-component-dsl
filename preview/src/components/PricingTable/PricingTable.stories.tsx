import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from './PricingTable';

const samplePlans = [
  { name: 'Starter', price: '$9', description: 'For individuals', features: ['1 user', '5GB'], cta: 'Start Free' },
  { name: 'Pro', price: '$29', description: 'For teams', features: ['10 users', '50GB', 'Priority support'], cta: 'Get Pro', highlighted: true },
  { name: 'Enterprise', price: '$99', description: 'For orgs', features: ['Unlimited', '1TB', '24/7 support', 'SLA'], cta: 'Contact' },
];

const meta = {
  title: 'Components/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
  args: {
    title: 'Simple, transparent pricing',
    subtitle: 'Choose the plan that works for you.',
    plans: samplePlans,
  },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithBadge: Story = { args: { badge: 'Pricing' } };
