import figma from '@figma/code-connect';
import { PriceTag } from './PriceTag';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(PriceTag, FIGMA_URL, {
  props: {
    price: figma.string('Price'),
    originalPrice: figma.string('Original Price'),
    discount: figma.string('Discount'),
    label: figma.string('Label'),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <PriceTag
      price={props.price}
      originalPrice={props.originalPrice}
      discount={props.discount}
      label={props.label}
      size={props.size}
    />
  ),
});
