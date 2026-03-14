import type { Meta, StoryObj } from '@storybook/react';
import { CTABanner } from './CTABanner';

const meta = {
  title: 'Components/CTABanner',
  component: CTABanner,
  tags: ['autodocs'],
  args: {
    title: 'Ready to get started?',
    subtitle: 'Join thousands of satisfied customers today.',
    primaryCta: 'Start Free Trial',
  },
} satisfies Meta<typeof CTABanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSecondaryCta: Story = { args: { secondaryCta: 'Contact Sales' } };
export const NoSubtitle: Story = { args: { subtitle: undefined } };
