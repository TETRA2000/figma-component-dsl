import figma from '@figma/code-connect';
import { WorkoutCard } from './WorkoutCard';
figma.connect(WorkoutCard, 'https://figma.com/design/placeholder/WorkoutCard', {
  props: { type: figma.string('Type'), duration: figma.string('Duration'), calories: figma.string('Calories') },
  example: (props) => <WorkoutCard {...props} />,
});
