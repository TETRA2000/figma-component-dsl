import figma from '@figma/code-connect';
import { ProductGrid } from './ProductGrid';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(ProductGrid, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
    columns: figma.enum('Columns', {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    }),
  },
  example: (props) => (
    <ProductGrid
      title={props.title}
      subtitle={props.subtitle}
      products={[]}
      columns={props.columns}
    />
  ),
});
