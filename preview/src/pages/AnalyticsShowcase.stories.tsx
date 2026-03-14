import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsShowcase } from './AnalyticsShowcase';

const meta = {
  title: 'Pages/AnalyticsShowcase',
  component: AnalyticsShowcase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AnalyticsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
