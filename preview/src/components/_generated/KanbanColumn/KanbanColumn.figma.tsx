import figma from '@figma/code-connect';
import { KanbanColumn } from './KanbanColumn';

figma.connect(KanbanColumn, 'https://figma.com/design/placeholder/KanbanColumn', {
  props: {
    title: figma.string('Title'),
    count: figma.enum('Count', { '0': 0, '1': 1, '2': 2, '3': 3 }),
    color: figma.string('Color'),
  },
  example: (props) => <KanbanColumn {...props} />,
});
