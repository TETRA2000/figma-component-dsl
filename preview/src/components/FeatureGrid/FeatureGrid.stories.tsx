import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';
import { AllVariantsGrid } from '../../storybook';

const sampleFeatures = [
  { icon: '⚡', title: 'Fast', description: 'Optimized for speed.' },
  { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security.' },
  { icon: '📊', title: 'Analytics', description: 'Real-time insights.' },
  { icon: '🔄', title: 'Sync', description: 'Automatic synchronization.' },
];

const meta = {
  title: 'Components/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [2, 3, 4] },
  },
  args: {
    title: 'Everything you need',
    subtitle: 'All-in-one platform for your business.',
    features: sampleFeatures,
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = { args: { columns: 3 } };
export const TwoColumns: Story = { args: { columns: 2 } };
export const FourColumns: Story = { args: { columns: 4 } };
export const WithBadge: Story = { args: { badge: 'Features' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={FeatureGrid}
      axes={[{ prop: 'columns', values: [2, 3, 4] }]}
      baseProps={{ title: 'Features', features: sampleFeatures }}
    />
  ),
};
