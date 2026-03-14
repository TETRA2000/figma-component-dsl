import figma from '@anthropic/code-connect';
import { BalanceCard } from './BalanceCard';

figma.connect(BalanceCard, 'BalanceCard', {
  props: {
    accountName: figma.string('accountName'),
    accountNumber: figma.string('accountNumber'),
    balance: figma.string('balance'),
  },
  example: (props) => <BalanceCard {...props} />,
});
