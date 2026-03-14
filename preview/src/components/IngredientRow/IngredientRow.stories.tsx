import type { Meta, StoryObj } from '@storybook/react';
import { IngredientRow } from './IngredientRow';

const meta = {
  title: 'Components/IngredientRow',
  component: IngredientRow,
  tags: ['autodocs'],
  args: { name: 'All-purpose flour', amount: '2 cups' },
} satisfies Meta<typeof IngredientRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithStep: Story = { args: { name: 'Butter', amount: '1/2 cup', step: 1 } };
