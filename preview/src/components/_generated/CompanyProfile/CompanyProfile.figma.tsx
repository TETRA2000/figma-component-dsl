import figma from '@figma/code-connect';
import { CompanyProfile } from './CompanyProfile';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(CompanyProfile, FIGMA_URL, {
  props: {
    heading: figma.string('Heading'),
    description: figma.string('Description'),
  },
  example: (props) => (
    <CompanyProfile
      heading={props.heading}
      description={props.description}
      stats={[
        { value: '1,200+', label: 'Employees' },
        { value: '¥50B', label: 'Revenue' },
      ]}
    />
  ),
});
