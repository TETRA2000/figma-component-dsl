import figma from '@figma/code-connect';
import { CalendarEvent } from './CalendarEvent';

figma.connect(CalendarEvent, 'https://figma.com/design/placeholder/CalendarEvent', {
  props: {
    title: figma.string('Title'),
    startTime: figma.string('Start Time'),
    endTime: figma.string('End Time'),
    location: figma.string('Location'),
    color: figma.enum('Color', {
      Blue: 'blue',
      Green: 'green',
      Orange: 'orange',
    }),
  },
  example: (props) => <CalendarEvent {...props} />,
});
