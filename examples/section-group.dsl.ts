/**
 * Section grouping — a Figma section containing multiple child frames.
 *
 * Demonstrates:
 *  - section() factory
 *  - sectionContentsHidden property
 *  - Multiple children within a section
 */
import { section, rectangle, solid } from '@figma-dsl/core';

export default section('ComponentGroup', {
  size: { x: 400, y: 300 },
  fills: [solid('#F5F5F5')],
  contentsHidden: false,
  children: [
    rectangle('CardA', { size: { x: 120, y: 80 }, fills: [solid('#3498DB')] }),
    rectangle('CardB', { size: { x: 120, y: 80 }, fills: [solid('#E74C3C')] }),
    rectangle('CardC', { size: { x: 120, y: 80 }, fills: [solid('#2ECC71')] }),
  ],
});
