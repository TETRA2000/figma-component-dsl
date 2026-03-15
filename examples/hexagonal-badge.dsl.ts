/**
 * Hexagonal badge — a 6-sided polygon with fills and corner radius.
 *
 * Demonstrates:
 *  - polygon() factory with pointCount
 *  - cornerRadius on polygon vertices
 *  - Solid fill
 */
import { polygon, solid } from '@figma-dsl/core';

export default polygon('HexBadge', {
  pointCount: 6,
  size: { x: 120, y: 120 },
  fills: [solid('#3498DB')],
  cornerRadius: 4,
});
