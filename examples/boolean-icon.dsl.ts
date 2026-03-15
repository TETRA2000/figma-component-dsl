/**
 * Boolean-subtracted icon — a circle with a rectangular cutout.
 *
 * Demonstrates:
 *  - subtract() boolean operation factory
 *  - Compositing two shapes (ellipse minus rectangle)
 *  - Solid fill on the boolean result
 */
import { subtract, ellipse, rectangle, solid } from '@figma-dsl/core';

export default subtract('MinusIcon', {
  children: [
    ellipse('Circle', { size: { x: 80, y: 80 }, fills: [solid('#2C3E50')] }),
    rectangle('Bar', { size: { x: 40, y: 10 } }),
  ],
});
