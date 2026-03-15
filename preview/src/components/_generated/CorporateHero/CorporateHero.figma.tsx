import figma from '@figma/code-connect';
import { CorporateHero } from './CorporateHero';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(CorporateHero, FIGMA_URL, {
  props: {
    companyName: figma.string('Company Name'),
    tagline: figma.string('Tagline'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <CorporateHero
      companyName={props.companyName}
      tagline={props.tagline}
      subtitle={props.subtitle}
    />
  ),
});
