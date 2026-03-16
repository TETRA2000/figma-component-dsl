import figma from '@figma/code-connect';
import { CourseCard } from './CourseCard';

figma.connect(CourseCard, 'https://figma.com/design/placeholder/CourseCard', {
  props: {
    title: figma.string('Title'),
    instructor: figma.string('Instructor'),
    lessonsCount: figma.number('Lessons Count'),
    duration: figma.string('Duration'),
    progress: figma.number('Progress'),
    category: figma.string('Category'),
  },
  example: (props) => <CourseCard {...props} />,
});
