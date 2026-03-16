import figma from '@figma/code-connect';
import { BalanceCard } from './BalanceCard';
figma.connect(BalanceCard, 'https://figma.com/design/placeholder/BalanceCard', {
  props: { label: figma.string('Label'), amount: figma.string('Amount') },
  example: (props) => <BalanceCard {...props} />,
});
