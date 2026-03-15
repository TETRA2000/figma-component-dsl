import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { createDslParameters, AllVariantsGrid } from '../../storybook';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { dsl: createDslParameters('Button') },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline Button' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost Button' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small Button' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large Button' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Button' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled Button' },
};

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={Button}
      axes={[
        { prop: 'variant', values: ['primary', 'secondary', 'outline', 'ghost'] },
        { prop: 'size', values: ['sm', 'md', 'lg'] },
      ]}
      baseProps={{ children: 'Button' }}
    />
  ),
};
