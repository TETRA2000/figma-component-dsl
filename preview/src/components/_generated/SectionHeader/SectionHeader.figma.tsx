import figma from '@figma/code-connect';
import { SectionHeader } from './SectionHeader';

figma.connect(SectionHeader, 'https://figma.com/design/placeholder/SectionHeader', {
  props: {
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => <SectionHeader {...props} />,
});
