import figma from '@figma/code-connect';
import { ForecastDay } from './ForecastDay';

figma.connect(ForecastDay, 'https://figma.com/design/placeholder/ForecastDay', {
  props: {
    day: figma.string('Day'),
    icon: figma.string('Icon'),
  },
  example: (props) => <ForecastDay {...props} />,
});
