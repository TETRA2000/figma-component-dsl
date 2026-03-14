import figma from '@figma/code-connect';
import { TransactionRow } from './TransactionRow';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/TransactionRow';

figma.connect(TransactionRow, FIGMA_URL, {
  props: {
    merchant: figma.string('Merchant'),
    amount: figma.string('Amount'),
    category: figma.string('Category'),
    positive: figma.boolean('Positive'),
  },
  example: (props) => (
    <TransactionRow
      merchant={props.merchant}
      amount={props.amount}
      category={props.category}
      date="Mar 14"
      positive={props.positive}
    />
  ),
});
