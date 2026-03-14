import figma from '@figma/code-connect';
import { Hero } from './Hero';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1281';

figma.connect(Hero, FIGMA_URL, {
  props: {
    badge: figma.string('Badge'),
    title: figma.string('Title'),
    gradientText: figma.string('Gradient Text'),
    subtitle: figma.string('Subtitle'),
    primaryCta: figma.string('Primary CTA'),
    secondaryCta: figma.string('Secondary CTA'),
    alignment: figma.enum('Alignment', {
      Center: 'center',
      Left: 'left',
    }),
  },
  example: (props) => (
    <Hero
      badge={props.badge}
      title={props.title}
      gradientText={props.gradientText}
      subtitle={props.subtitle}
      primaryCta={props.primaryCta}
      secondaryCta={props.secondaryCta}
      alignment={props.alignment}
    />
  ),
});
