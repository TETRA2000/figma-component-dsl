import figma from '@figma/code-connect';
import { LessonItem } from './LessonItem';

figma.connect(LessonItem, 'https://figma.com/design/placeholder/LessonItem', {
  props: {
    number: figma.number('Number'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
    duration: figma.string('Duration'),
    completed: figma.boolean('Completed'),
  },
  example: (props) => <LessonItem {...props} />,
});
