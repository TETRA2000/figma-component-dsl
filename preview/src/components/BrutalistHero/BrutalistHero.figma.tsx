import figma from '@figma/code-connect';
import { BrutalistHero } from './BrutalistHero';

figma.connect(BrutalistHero, 'FIGMA_URL_HERE', {
  props: {
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: ({ title, subtitle }) => (
    <BrutalistHero title={title} subtitle={subtitle} />
  ),
});
