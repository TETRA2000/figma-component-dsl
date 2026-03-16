import figma from '@figma/code-connect';
import { TagPill } from './TagPill';

figma.connect(TagPill, 'https://figma.com/design/placeholder/TagPill', {
  props: { label: figma.string('Label') },
  example: (props) => <TagPill {...props} />,
});
