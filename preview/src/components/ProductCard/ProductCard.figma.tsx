import figma from '@figma/code-connect';
import { ProductCard } from './ProductCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(ProductCard, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    price: figma.string('Price'),
    originalPrice: figma.string('Original Price'),
    discount: figma.string('Discount'),
    badge: figma.string('Badge'),
    prime: figma.boolean('Prime'),
    inStock: figma.boolean('In Stock'),
  },
  example: (props) => (
    <ProductCard
      image="https://via.placeholder.com/300"
      title={props.title}
      rating={4.5}
      reviewCount={1234}
      price={props.price}
      originalPrice={props.originalPrice}
      discount={props.discount}
      badge={props.badge}
      prime={props.prime}
      inStock={props.inStock}
    />
  ),
});
