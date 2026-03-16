import figma from '@figma/code-connect';
import { ReviewCard } from './ReviewCard';

figma.connect(ReviewCard, 'https://figma.com/design/placeholder/ReviewCard', {
  props: {},
  example: () => (
    <ReviewCard
      name="Jane Doe"
      initials="JD"
      rating={5}
      text="Great product!"
      date="Jan 1, 2025"
      color="#2563eb"
    />
  ),
});
