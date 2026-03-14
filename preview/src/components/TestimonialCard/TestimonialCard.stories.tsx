import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from './TestimonialCard';

const meta = {
  title: 'Components/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
  args: {
    quote: 'This product has completely transformed our workflow. Highly recommended!',
    author: 'Jane Doe',
    title: 'CTO, TechCorp',
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRating: Story = { args: { rating: 5 } };
export const WithAvatar: Story = { args: { avatar: 'https://i.pravatar.cc/48?img=1', rating: 4 } };
