import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'select', options: ['center', 'left'] },
  },
  args: {
    title: 'Build Something',
    gradientText: 'Amazing',
    subtitle: 'A powerful platform for building modern applications.',
    primaryCta: 'Get Started',
    secondaryCta: 'Learn More',
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = { args: { alignment: 'center' } };
export const Left: Story = { args: { alignment: 'left' } };
export const WithBadge: Story = { args: { badge: 'New Release', alignment: 'center' } };
export const MinimalCtas: Story = { args: { secondaryCta: undefined } };
