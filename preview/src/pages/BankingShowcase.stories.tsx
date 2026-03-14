import type { Meta, StoryObj } from '@storybook/react';
import { BankingShowcase } from './BankingShowcase';

const meta = {
  title: 'Pages/BankingShowcase',
  component: BankingShowcase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BankingShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
