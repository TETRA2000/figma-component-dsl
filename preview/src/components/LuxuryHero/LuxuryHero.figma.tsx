import figma from '@figma/code-connect';
import { LuxuryHero } from './LuxuryHero';

figma.connect(LuxuryHero, 'FIGMA_URL_HERE', {
  props: { title: figma.string('Title'), subtitle: figma.string('Subtitle') },
  example: ({ title, subtitle }) => <LuxuryHero title={title} subtitle={subtitle} />,
});
