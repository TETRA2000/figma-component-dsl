import figma from '@figma/code-connect';
import { MiniCalendar } from './MiniCalendar';

figma.connect(MiniCalendar, 'https://figma.com/design/placeholder/MiniCalendar', {
  props: {
    month: figma.string('Month'),
    year: figma.string('Year'),
    todayDate: figma.string('Today Date'),
  },
  example: (props) => <MiniCalendar {...props} />,
});
