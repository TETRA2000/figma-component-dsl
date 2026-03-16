import figma from '@figma/code-connect';
import { WeatherDetail } from './WeatherDetail';

figma.connect(WeatherDetail, 'https://figma.com/design/placeholder/WeatherDetail', {
  props: {
    label: figma.string('Label'),
    value: figma.string('Value'),
    unit: figma.string('Unit'),
  },
  example: (props) => <WeatherDetail {...props} />,
});
