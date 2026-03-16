import figma from '@figma/code-connect';
import { SkillTag } from './SkillTag';

figma.connect(SkillTag, 'https://figma.com/design/placeholder/SkillTag', {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => <SkillTag {...props} />,
});
