import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { AllVariantsGrid, createDslParameters } from '../../storybook';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { dsl: createDslParameters('Badge') },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning'] },
  },
  args: { children: 'Badge' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'default' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Success: Story = { args: { variant: 'success' } };
export const Warning: Story = { args: { variant: 'warning' } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={Badge}
      axes={[{ prop: 'variant', values: ['default', 'primary', 'success', 'warning'] }]}
      baseProps={{ children: 'Badge' }}
    />
  ),
};
