import type { Meta, StoryObj } from '@storybook/react';
import { Testimonials } from './Testimonials';

const sampleTestimonials = [
  { quote: 'Amazing product!', author: 'Jane Doe', title: 'CTO, TechCorp', rating: 5 },
  { quote: 'Transformed our workflow.', author: 'John Smith', title: 'VP Eng, StartupCo', rating: 4 },
  { quote: 'Best in class.', author: 'Alice Chen', title: 'Lead Dev, BigCo', rating: 5 },
];

const meta = {
  title: 'Components/Testimonials',
  component: Testimonials,
  tags: ['autodocs'],
  args: {
    title: 'What our customers say',
    subtitle: 'Hear from teams that use our product.',
    testimonials: sampleTestimonials,
  },
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithBadge: Story = { args: { badge: 'Testimonials' } };
