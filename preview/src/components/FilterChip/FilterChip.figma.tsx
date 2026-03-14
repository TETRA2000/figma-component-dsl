import figma from '@figma/code-connect';
import { FilterChip } from './FilterChip';

figma.connect(FilterChip, 'PLACEHOLDER_FIGMA_URL', {
  props: {
    label: figma.string('Label'),
    active: figma.boolean('Active'),
  },
  example: (props) => <FilterChip {...props} />,
});
