import type { Meta, StoryObj } from '@storybook/react';
import { DogfoodingGallery } from './DogfoodingGallery';

const meta = {
  title: 'Pages/DogfoodingGallery',
  component: DogfoodingGallery,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DogfoodingGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
