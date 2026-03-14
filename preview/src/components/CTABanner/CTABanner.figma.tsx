import figma from '@figma/code-connect';
import { CTABanner } from './CTABanner';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1533';

figma.connect(CTABanner, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
    primaryCta: figma.string('Primary CTA'),
    secondaryCta: figma.string('Secondary CTA'),
  },
  example: (props) => (
    <CTABanner
      title={props.title}
      subtitle={props.subtitle}
      primaryCta={props.primaryCta}
      secondaryCta={props.secondaryCta}
    />
  ),
});
