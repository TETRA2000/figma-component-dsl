import figma from '@figma/code-connect';
import { TransactionRow } from './TransactionRow';
figma.connect(TransactionRow, 'https://figma.com/design/placeholder/TransactionRow', {
  props: { title: figma.string('Title'), amount: figma.string('Amount') },
  example: (props) => <TransactionRow {...props} />,
});
