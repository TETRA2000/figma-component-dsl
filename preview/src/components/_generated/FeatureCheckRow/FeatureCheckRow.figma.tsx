import figma from '@figma/code-connect';
import { FeatureCheckRow } from './FeatureCheckRow';

figma.connect(FeatureCheckRow, 'https://figma.com/design/placeholder/FeatureCheckRow', {
  props: {
    label: figma.string('Label'),
    included: figma.boolean('Included'),
  },
  example: (props) => <FeatureCheckRow {...props} />,
});
