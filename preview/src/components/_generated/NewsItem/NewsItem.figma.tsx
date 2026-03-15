import figma from '@figma/code-connect';
import { NewsItem } from './NewsItem';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(NewsItem, FIGMA_URL, {
  props: {
    date: figma.string('Date'),
    category: figma.enum('Category', {
      Press: 'press',
      IR: 'ir',
      Product: 'product',
      Event: 'event',
    }),
    title: figma.string('Title'),
  },
  example: (props) => (
    <NewsItem
      date={props.date}
      category={props.category}
      title={props.title}
    />
  ),
});
