import figma from '@figma/code-connect';
import { FilterChip } from './FilterChip';

figma.connect(FilterChip, 'https://figma.com/design/placeholder/FilterChip', {
  props: {
    label: figma.string('Label'),
    active: figma.boolean('Active'),
  },
  example: (props) => <FilterChip {...props} />,
});
