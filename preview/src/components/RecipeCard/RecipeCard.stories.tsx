import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCard } from './RecipeCard';

const meta = {
  title: 'Components/RecipeCard',
  component: RecipeCard,
  tags: ['autodocs'],
  args: {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies that are soft and chewy.',
    time: '45 min',
    difficulty: 'Easy',
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTags: Story = { args: { tags: ['Dessert', 'Baking', 'Quick'] } };
export const CustomBackground: Story = { args: { imageBg: '#d1fae5', title: 'Garden Salad' } };
