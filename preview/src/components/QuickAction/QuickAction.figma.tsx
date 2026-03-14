import figma from '@figma/code-connect';
import { QuickAction } from './QuickAction';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/QuickAction';

figma.connect(QuickAction, FIGMA_URL, {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => (
    <QuickAction label={props.label} iconColor="#3b82f6" />
  ),
});
