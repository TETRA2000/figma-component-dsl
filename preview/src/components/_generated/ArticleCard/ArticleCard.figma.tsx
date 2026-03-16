import figma from '@figma/code-connect';
import { ArticleCard } from './ArticleCard';

figma.connect(ArticleCard, 'https://figma.com/design/placeholder/ArticleCard', {
  props: {
    title: figma.string('Title'),
    excerpt: figma.string('Excerpt'),
    date: figma.string('Date'),
    tag: figma.string('Tag'),
  },
  example: (props) => <ArticleCard {...props} />,
});
