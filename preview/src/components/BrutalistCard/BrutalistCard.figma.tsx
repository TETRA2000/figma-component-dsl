import figma from '@figma/code-connect';
import { BrutalistCard } from './BrutalistCard';

figma.connect(BrutalistCard, 'FIGMA_URL_HERE', {
  props: {
    number: figma.string('Number'),
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: ({ number, title, description }) => (
    <BrutalistCard number={number} title={title} description={description} />
  ),
});
