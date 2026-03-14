import figma from '@figma/code-connect';
import { Navbar } from './Navbar';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1248';

figma.connect(Navbar, FIGMA_URL, {
  props: {
    logo: figma.string('Logo'),
    ctaLabel: figma.string('CTA Label'),
  },
  example: (props) => (
    <Navbar
      logo={props.logo}
      links={[
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ]}
      ctaLabel={props.ctaLabel}
    />
  ),
});
