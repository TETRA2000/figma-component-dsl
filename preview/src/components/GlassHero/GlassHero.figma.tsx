import figma from '@figma/code-connect';
import { GlassHero } from './GlassHero';

figma.connect(GlassHero, 'FIGMA_URL_HERE', {
  props: {
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: ({ title, subtitle }) => <GlassHero title={title} subtitle={subtitle} />,
});
