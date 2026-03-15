import type { Meta, StoryObj } from '@storybook/react';
import { Stats } from './Stats';
import { AllVariantsGrid } from '../../storybook';

const sampleStats = [
  { value: '10K+', label: 'Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
  { value: '50+', label: 'Countries' },
];

const meta = {
  title: 'Components/Stats',
  component: Stats,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['inline', 'cards'] },
  },
  args: { stats: sampleStats },
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = { args: { variant: 'inline' } };
export const Cards: Story = { args: { variant: 'cards' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={Stats}
      axes={[{ prop: 'variant', values: ['inline', 'cards'] }]}
      baseProps={{ stats: sampleStats }}
    />
  ),
};
