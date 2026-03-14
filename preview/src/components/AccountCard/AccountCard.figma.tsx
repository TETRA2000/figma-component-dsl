import figma from '@figma/code-connect';
import { AccountCard } from './AccountCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/AccountCard';

figma.connect(AccountCard, FIGMA_URL, {
  props: {
    type: figma.string('Type'),
    accountNumber: figma.string('Account Number'),
    balance: figma.string('Balance'),
    currency: figma.string('Currency'),
  },
  example: (props) => (
    <AccountCard
      type={props.type}
      accountNumber={props.accountNumber}
      balance={props.balance}
      currency={props.currency}
    />
  ),
});
