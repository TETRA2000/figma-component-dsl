import figma from '@figma/code-connect';
import { DayColumn } from './DayColumn';

figma.connect(DayColumn, 'https://figma.com/design/placeholder/DayColumn', {
  props: {
    dayName: figma.string('Day Name'),
    dateNumber: figma.string('Date Number'),
    isToday: figma.boolean('Is Today'),
  },
  example: (props) => <DayColumn {...props} />,
});
