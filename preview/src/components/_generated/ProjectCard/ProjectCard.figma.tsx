import figma from '@figma/code-connect';
import { ProjectCard } from './ProjectCard';

figma.connect(ProjectCard, 'https://figma.com/design/placeholder/ProjectCard', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    accentColor: figma.string('AccentColor'),
  },
  example: (props) => <ProjectCard {...props} />,
});
