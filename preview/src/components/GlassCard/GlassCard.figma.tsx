import figma from '@figma/code-connect';
import { GlassCard } from './GlassCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(GlassCard, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Elevated: 'elevated',
      Filled: 'filled',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <GlassCard variant={props.variant} size={props.size}>
      Card content
    </GlassCard>
  ),
});
