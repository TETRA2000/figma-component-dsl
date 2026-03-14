import figma from '@figma/code-connect';
import { LuxuryCard } from './LuxuryCard';

figma.connect(LuxuryCard, 'FIGMA_URL_HERE', {
  props: { label: figma.string('Label'), title: figma.string('Title'), description: figma.string('Description') },
  example: ({ label, title, description }) => <LuxuryCard label={label} title={title} description={description} />,
});
