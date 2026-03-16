import figma from '@figma/code-connect';
import { ProductImage } from './ProductImage';

figma.connect(ProductImage, 'https://figma.com/design/placeholder/ProductImage', {
  props: {},
  example: () => <ProductImage mainColor="#2563eb" accentColor="#7c3aed" />,
});
