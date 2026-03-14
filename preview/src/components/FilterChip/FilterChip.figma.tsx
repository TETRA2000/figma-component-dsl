import figma from '@figma/code-connect';
import { FilterChip } from './FilterChip';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER?node-id=travel-filter-chip';

figma.connect(FilterChip, FIGMA_URL, {
  props: {
    label: figma.string('Label'),
    active: figma.boolean('Active'),
  },
  example: (props) => (
    <FilterChip label={props.label} active={props.active} />
  ),
});
