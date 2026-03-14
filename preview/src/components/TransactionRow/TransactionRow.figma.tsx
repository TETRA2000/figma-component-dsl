import figma from '@anthropic/code-connect';
import { TransactionRow } from './TransactionRow';

figma.connect(TransactionRow, 'TransactionRow', {
  props: {
    title: figma.string('title'),
    category: figma.string('category'),
    amount: figma.string('amount'),
    date: figma.string('date'),
    type: figma.enum('type', { credit: 'credit', debit: 'debit' }),
  },
  example: (props) => <TransactionRow {...props} />,
});
