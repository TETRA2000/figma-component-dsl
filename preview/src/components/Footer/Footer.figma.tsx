import figma from '@figma/code-connect';
import { Footer } from './Footer';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1563';

figma.connect(Footer, FIGMA_URL, {
  props: {
    logo: figma.string('Logo'),
    description: figma.string('Description'),
    copyright: figma.string('Copyright'),
  },
  example: (props) => (
    <Footer
      logo={props.logo}
      description={props.description}
      columns={[
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
          ],
        },
      ]}
      copyright={props.copyright}
    />
  ),
});
