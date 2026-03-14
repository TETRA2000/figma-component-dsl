# Code Connect Patterns

Code Connect links React components to their Figma design counterparts, enabling "View code" in Figma's Dev Mode.

## Basic Pattern

```tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

const FIGMA_URL = 'https://www.figma.com/design/{fileKey}?node-id={nodeId}';

figma.connect(Button, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => (
    <Button variant={props.variant} disabled={props.disabled}>
      {props.label}
    </Button>
  ),
});
```

## Prop Mapping Functions

### `figma.enum(propertyName, mapping)`
Maps a Figma variant property to code values.
```tsx
variant: figma.enum('Variant', {
  Primary: 'primary',     // Figma value → code value
  Secondary: 'secondary',
})
```

### `figma.string(propertyName)`
Maps a Figma text property to a string prop.
```tsx
label: figma.string('Label')
```

### `figma.boolean(propertyName)`
Maps a Figma boolean property to a boolean prop.
```tsx
fullWidth: figma.boolean('Full Width')
```

### `figma.boolean(propertyName, mapping)`
Maps a boolean to conditional rendering.
```tsx
icon: figma.boolean('Has Icon', {
  true: <Icon />,
  false: undefined,
})
```

### `figma.instance(propertyName)`
Maps an instance swap property.
```tsx
icon: figma.instance('Icon')
```

## Multiple Variants

When a component has multiple variant combinations:
```tsx
figma.connect(Button, FIGMA_URL, {
  variant: { Size: 'Large' },  // Only apply when Size=Large in Figma
  props: { /* ... */ },
  example: (props) => <Button size="lg" {...props} />,
});
```

## File Naming

Code Connect files follow the pattern: `{ComponentName}.figma.tsx`

They live alongside the component:
```
Button/
  Button.tsx
  Button.module.css
  Button.figma.tsx    ← Code Connect
```

## Figma URL Format

```
https://www.figma.com/design/{fileKey}?node-id={nodeId}
```

- `fileKey`: The Figma file identifier (from the URL)
- `nodeId`: The specific component node ID (right-click → Copy link in Figma)

Use `PLACEHOLDER` during development; replace after Figma import.
