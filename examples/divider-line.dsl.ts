/**
 * Divider line — a horizontal rule with round stroke caps.
 *
 * Demonstrates:
 *  - line() factory
 *  - strokeCap property
 *  - Custom stroke color and weight
 */
import { line } from '@figma-dsl/core';

export default line('Divider', {
  size: { x: 300 },
  strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 2, strokeCap: 'ROUND' }],
});
