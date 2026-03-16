import figma from '@figma/code-connect';
import { TaskCard } from './TaskCard';

figma.connect(TaskCard, 'https://figma.com/design/placeholder/TaskCard', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    priority: figma.enum('Priority', { High: 'high', Medium: 'medium', Low: 'low' }),
    assignee: figma.string('Assignee'),
    dueDate: figma.string('DueDate'),
  },
  example: (props) => <TaskCard {...props} />,
});
