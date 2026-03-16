import figma from '@figma/code-connect';
import { AccountSelector } from './AccountSelector';
figma.connect(AccountSelector, 'https://figma.com/design/placeholder/AccountSelector', {
  props: { name: figma.string('Name'), type: figma.string('Type') },
  example: (props) => <AccountSelector {...props} />,
});
