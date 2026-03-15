import type { Meta, StoryObj } from '@storybook/react';
import { FAQ } from './FAQ';

const meta = {
  title: 'Components/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know.',
    items: [
      { question: 'What is this product?', answer: 'A comprehensive platform for building modern web applications.' },
      { question: 'How much does it cost?', answer: 'We offer flexible pricing plans starting at $9/month.' },
      { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial with no credit card required.' },
    ],
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithBadge: Story = { args: { badge: 'FAQ' } };
