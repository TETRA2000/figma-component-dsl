import figma from '@figma/code-connect';
import { CategoryPill } from './CategoryPill';

figma.connect(CategoryPill, 'https://figma.com/design/placeholder/CategoryPill', {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => <CategoryPill {...props} />,
});
