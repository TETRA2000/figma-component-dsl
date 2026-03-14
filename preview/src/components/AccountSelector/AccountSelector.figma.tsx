import figma from '@anthropic/code-connect';
import { AccountSelector } from './AccountSelector';

figma.connect(AccountSelector, 'AccountSelector', {
  props: {},
  example: () => (
    <AccountSelector accounts={[{ label: 'Checking', active: true }, { label: 'Savings' }]} />
  ),
});
