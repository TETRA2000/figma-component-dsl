import type { Meta, StoryObj } from '@storybook/react';
import { PricingShowcase } from './PricingShowcase';

const meta = {
  title: 'Pages/PricingShowcase',
  component: PricingShowcase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
