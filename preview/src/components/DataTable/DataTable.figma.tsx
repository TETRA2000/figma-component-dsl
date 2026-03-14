import figma from '@figma/code-connect';
import { DataTable } from './DataTable';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/DataTable';

figma.connect(DataTable, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
  },
  example: (props) => (
    <DataTable
      title={props.title}
      rows={[
        { name: 'Direct', value: '$12,400', trend: '+12.5%', status: 'up' },
        { name: 'Organic', value: '$8,200', trend: '-3.2%', status: 'down' },
      ]}
    />
  ),
});
