import figma from '@figma/code-connect';
import { WeatherCard } from './WeatherCard';

figma.connect(WeatherCard, 'https://figma.com/design/placeholder/WeatherCard', {
  props: {
    city: figma.string('City'),
    condition: figma.string('Condition'),
  },
  example: (props) => <WeatherCard {...props} />,
});
