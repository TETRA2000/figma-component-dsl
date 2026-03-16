import figma from '@figma/code-connect';
import { ProductInfo } from './ProductInfo';

figma.connect(ProductInfo, 'https://figma.com/design/placeholder/ProductInfo', {
  props: {},
  example: () => (
    <ProductInfo
      name="Minimalist Desk Lamp"
      rating={4.8}
      reviewCount={256}
      price="$89.99"
      originalPrice="$119.99"
      sizes={['S', 'M', 'L']}
    />
  ),
});
