import figma from '@figma/code-connect';
import { MedicationPill } from './MedicationPill';

figma.connect(MedicationPill, 'https://figma.com/design/placeholder/MedicationPill', {
  props: {
    name: figma.string('Name'),
    dosage: figma.string('Dosage'),
    time: figma.string('Time'),
  },
  example: (props) => <MedicationPill {...props} />,
});
