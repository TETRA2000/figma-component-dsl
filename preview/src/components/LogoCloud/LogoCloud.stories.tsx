import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from './LogoCloud';
import { AllVariantsGrid } from '../../storybook';

const sampleLogos = [
  { name: 'Company A', src: 'https://via.placeholder.com/120x40?text=A' },
  { name: 'Company B', src: 'https://via.placeholder.com/120x40?text=B' },
  { name: 'Company C', src: 'https://via.placeholder.com/120x40?text=C' },
  { name: 'Company D', src: 'https://via.placeholder.com/120x40?text=D' },
];

const meta = {
  title: 'Components/LogoCloud',
  component: LogoCloud,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['grid', 'scroll'] },
  },
  args: {
    title: 'Trusted by leading companies',
    logos: sampleLogos,
  },
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = { args: { variant: 'grid' } };
export const Scroll: Story = { args: { variant: 'scroll' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={LogoCloud}
      axes={[{ prop: 'variant', values: ['grid', 'scroll'] }]}
      baseProps={{ title: 'Trusted by', logos: sampleLogos }}
    />
  ),
};
