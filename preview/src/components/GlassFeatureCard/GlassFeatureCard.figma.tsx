import figma from '@figma/code-connect';
import { GlassFeatureCard } from './GlassFeatureCard';

figma.connect(GlassFeatureCard, 'FIGMA_URL_HERE', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: ({ title, description }) => <GlassFeatureCard title={title} description={description} />,
});
