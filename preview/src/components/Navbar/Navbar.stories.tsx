import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { createDslParameters } from '../../storybook';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { dsl: createDslParameters('Navbar') },
  args: {
    logo: 'Acme',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
    ],
    ctaLabel: 'Get Started',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ManyLinks: Story = {
  args: {
    links: [
      { label: 'Home', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
};
