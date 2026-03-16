import figma from '@figma/code-connect';
import { AppointmentRow } from './AppointmentRow';

figma.connect(AppointmentRow, 'https://figma.com/design/placeholder/AppointmentRow', {
  props: {
    time: figma.string('Time'),
    period: figma.string('Period'),
    doctorName: figma.string('DoctorName'),
    specialty: figma.string('Specialty'),
  },
  example: (props) => <AppointmentRow {...props} />,
});
