import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { AllVariantsGrid } from '../../storybook';

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    padding: { control: 'boolean' },
  },
  args: {
    children: <div style={{ background: '#e5e7eb', padding: '2rem', textAlign: 'center' }}>Container Content</div>,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { maxWidth: 'sm' } };
export const Medium: Story = { args: { maxWidth: 'md' } };
export const Large: Story = { args: { maxWidth: 'lg' } };
export const NoPadding: Story = { args: { padding: false } };

export const AllVariants: Story = {
  render: () => (
    <AllVariantsGrid
      component={Container}
      axes={[{ prop: 'maxWidth', values: ['sm', 'md', 'lg', 'xl'] }]}
      baseProps={{
        children: <div style={{ background: '#e5e7eb', padding: '1rem', textAlign: 'center' }}>Content</div>,
      }}
    />
  ),
};
