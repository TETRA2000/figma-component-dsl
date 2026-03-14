import figma from '@figma/code-connect';
import { StarRating } from './StarRating';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(StarRating, FIGMA_URL, {
  props: {
    rating: figma.enum('Rating', {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    reviewCount: figma.string('Review Count'),
  },
  example: (props) => (
    <StarRating rating={props.rating} size={props.size} reviewCount={Number(props.reviewCount)} />
  ),
});
