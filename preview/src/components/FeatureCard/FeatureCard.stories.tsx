import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  args: {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-second response times.',
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Security: Story = { args: { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in.' } };
