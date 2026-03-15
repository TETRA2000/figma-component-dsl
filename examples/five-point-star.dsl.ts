/**
 * Five-point star — a classic star shape with default inner radius.
 *
 * Demonstrates:
 *  - star() factory with pointCount
 *  - Default innerRadius (0.382)
 *  - Solid fill
 */
import { star, solid } from '@figma-dsl/core';

export default star('GoldStar', {
  pointCount: 5,
  size: { x: 100, y: 100 },
  fills: [solid('#F1C40F')],
});
