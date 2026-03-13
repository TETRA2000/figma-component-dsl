"""PyCairo renderer for FigmaNodeDict JSON → PNG."""

import json
import math
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import cairo


@dataclass
class RenderOptions:
    output: str = "output.png"
    scale: float = 1.0
    background: str = "white"  # "white" | "transparent"
    assets_dir: str | None = None


def _parse_color(paint: dict[str, Any]) -> tuple[float, float, float, float]:
    """Extract RGBA from a paint's color field."""
    color = paint.get("color", {})
    return (
        color.get("r", 0),
        color.get("g", 0),
        color.get("b", 0),
        color.get("a", 1) * paint.get("opacity", 1),
    )


def _render_rounded_rect(
    ctx: cairo.Context,
    x: float, y: float, w: float, h: float,
    radius: float,
) -> None:
    """Draw a rounded rectangle path."""
    if radius <= 0:
        ctx.rectangle(x, y, w, h)
        return
    r = min(radius, w / 2, h / 2)
    ctx.new_sub_path()
    ctx.arc(x + w - r, y + r, r, -math.pi / 2, 0)
    ctx.arc(x + w - r, y + h - r, r, 0, math.pi / 2)
    ctx.arc(x + r, y + h - r, r, math.pi / 2, math.pi)
    ctx.arc(x + r, y + r, r, math.pi, 3 * math.pi / 2)
    ctx.close_path()


def _apply_gradient(
    ctx: cairo.Context,
    paint: dict[str, Any],
    w: float, h: float,
) -> None:
    """Apply a linear gradient fill."""
    stops = paint.get("gradientStops", [])
    transform = paint.get("gradientTransform")
    if not stops or not transform:
        return

    # The gradient transform maps [0,1]×[0,1] to the gradient line.
    # We need to convert it to start/end points in node coordinates.
    row0 = transform[0]
    row1 = transform[1]

    # Start point (position=0): transform × [0, 0.5, 1]
    sx = row0[0] * 0 + row0[1] * 0.5 + row0[2]
    sy = row1[0] * 0 + row1[1] * 0.5 + row1[2]

    # End point (position=1): transform × [1, 0.5, 1]
    ex = row0[0] * 1 + row0[1] * 0.5 + row0[2]
    ey = row1[0] * 1 + row1[1] * 0.5 + row1[2]

    pattern = cairo.LinearGradient(sx * w, sy * h, ex * w, ey * h)
    for stop in stops:
        color = stop.get("color", {})
        r = color.get("r", 0)
        g = color.get("g", 0)
        b = color.get("b", 0)
        a = color.get("a", 1)
        pattern.add_color_stop_rgba(stop.get("position", 0), r, g, b, a)

    ctx.set_source(pattern)
    ctx.fill_preserve()


def _apply_fills(
    ctx: cairo.Context,
    node: dict[str, Any],
    w: float, h: float,
) -> None:
    """Apply all fills to the current path."""
    fill_paints = node.get("fillPaints", [])
    for paint in fill_paints:
        if not paint.get("visible", True):
            continue
        paint_type = paint.get("type", "")
        if paint_type == "SOLID":
            r, g, b, a = _parse_color(paint)
            ctx.set_source_rgba(r, g, b, a)
            ctx.fill_preserve()
        elif paint_type == "GRADIENT_LINEAR":
            _apply_gradient(ctx, paint, w, h)


def _apply_strokes(
    ctx: cairo.Context,
    node: dict[str, Any],
) -> None:
    """Apply stroke to the current path."""
    strokes = node.get("strokes", [])
    stroke_weight = node.get("strokeWeight", 0)
    if not strokes or not stroke_weight:
        return
    for stroke_paint in strokes:
        if not stroke_paint.get("visible", True):
            continue
        r, g, b, a = _parse_color(stroke_paint)
        ctx.set_source_rgba(r, g, b, a)
        ctx.set_line_width(stroke_weight)
        ctx.stroke_preserve()


def _weight_to_cairo(weight: int) -> int:
    """Map font weight to Cairo constant."""
    if weight >= 500:
        return cairo.FONT_WEIGHT_BOLD
    return cairo.FONT_WEIGHT_NORMAL


def _render_text(
    ctx: cairo.Context,
    node: dict[str, Any],
    x: float, y: float,
) -> None:
    """Render a TEXT node."""
    text_data = node.get("textData", {})
    derived = node.get("derivedTextData", {})
    characters = text_data.get("characters", "")
    lines = text_data.get("lines", [characters])
    baselines = derived.get("baselines", [])
    font_meta_list = derived.get("fontMetaData", [])

    font_family = node.get("fontFamily", "Inter")
    font_size = node.get("fontSize", 14)
    font_weight = 400
    if font_meta_list:
        font_weight = font_meta_list[0].get("fontWeight", 400)

    text_align = node.get("textAlignHorizontal", "LEFT")
    w = node.get("size", {}).get("x", 0)

    # Set text color from first fill
    fill_paints = node.get("fillPaints", [])
    if fill_paints:
        r, g, b, a = _parse_color(fill_paints[0])
        ctx.set_source_rgba(r, g, b, a)
    else:
        ctx.set_source_rgba(0, 0, 0, 1)

    ctx.select_font_face(
        font_family,
        cairo.FONT_SLANT_NORMAL,
        _weight_to_cairo(font_weight),
    )
    ctx.set_font_size(font_size)

    for i, line in enumerate(lines):
        if i < len(baselines):
            bl = baselines[i]
            line_y = bl.get("lineY", 0)
            line_height = bl.get("lineHeight", font_size * 1.2)
        else:
            line_y = i * font_size * 1.2
            line_height = font_size * 1.2

        # Compute text x position based on alignment
        extents = ctx.text_extents(line)
        text_width = extents.x_advance

        if text_align == "CENTER":
            tx = x + (w - text_width) / 2
        elif text_align == "RIGHT":
            tx = x + w - text_width
        else:
            tx = x

        # Baseline position: lineY + ascent approximation
        ty = y + line_y + font_size * 0.8
        ctx.move_to(tx, ty)
        ctx.show_text(line)


def _render_node(
    ctx: cairo.Context,
    node: dict[str, Any],
    options: RenderOptions,
    errors: list[dict[str, str]],
) -> None:
    """Recursively render a node and its children."""
    if not node.get("visible", True):
        return

    node_type = node.get("type", "")
    size = node.get("size", {"x": 0, "y": 0})
    w, h = size.get("x", 0), size.get("y", 0)

    # Apply node transform
    transform = node.get("transform", [[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    tx = transform[0][2] if len(transform) > 0 and len(transform[0]) > 2 else 0
    ty = transform[1][2] if len(transform) > 1 and len(transform[1]) > 2 else 0

    ctx.save()

    opacity = node.get("opacity", 1)
    if opacity < 1:
        ctx.push_group()

    if node_type == "TEXT":
        _render_text(ctx, node, tx, ty)
    elif node_type == "ELLIPSE":
        # Render ellipse
        if w > 0 and h > 0:
            ctx.save()
            ctx.translate(tx + w / 2, ty + h / 2)
            ctx.scale(w / 2, h / 2)
            ctx.arc(0, 0, 1, 0, 2 * math.pi)
            ctx.restore()
            _apply_fills(ctx, node, w, h)
            ctx.new_path()
    elif node_type in ("FRAME", "COMPONENT", "COMPONENT_SET", "INSTANCE", "RECTANGLE"):
        corner_radius = node.get("cornerRadius", 0)
        _render_rounded_rect(ctx, tx, ty, w, h, corner_radius)
        _apply_fills(ctx, node, w, h)
        _apply_strokes(ctx, node)
        ctx.new_path()

        # Clip content if needed
        if node.get("clipContent"):
            _render_rounded_rect(ctx, tx, ty, w, h, corner_radius)
            ctx.clip()
    elif node_type == "GROUP":
        pass  # Groups just render children
    else:
        errors.append({
            "nodePath": node.get("name", "?"),
            "nodeType": node_type,
            "error": f"Unsupported node type: {node_type}",
        })

    # Render children
    for child in node.get("children", []):
        _render_node(ctx, child, options, errors)

    if opacity < 1:
        ctx.pop_group_to_source()
        ctx.paint_with_alpha(opacity)

    ctx.restore()


def render(node_dict: dict[str, Any], options: RenderOptions) -> list[dict[str, str]]:
    """Render a FigmaNodeDict tree to a PNG file.

    Returns a list of error dicts (empty on success).
    """
    errors: list[dict[str, str]] = []

    # Determine canvas size from root node
    root = node_dict.get("root", node_dict)
    size = root.get("size", {"x": 100, "y": 100})
    w = int(size.get("x", 100) * options.scale)
    h = int(size.get("y", 100) * options.scale)

    # Ensure minimum size
    w = max(w, 1)
    h = max(h, 1)

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surface)

    # Scale for DPI
    if options.scale != 1.0:
        ctx.scale(options.scale, options.scale)

    # Background
    if options.background == "white":
        ctx.set_source_rgba(1, 1, 1, 1)
        ctx.paint()

    _render_node(ctx, root, options, errors)

    surface.write_to_png(options.output)
    return errors


def main() -> None:
    """CLI entry point for the renderer."""
    import argparse

    parser = argparse.ArgumentParser(description="Render FigmaNodeDict JSON to PNG")
    parser.add_argument("--input", "-i", help="Input JSON file (or - for stdin)")
    parser.add_argument("--output", "-o", default="output.png", help="Output PNG path")
    parser.add_argument("--scale", type=float, default=1.0, help="Scale factor")
    parser.add_argument("--bg", default="white", choices=["white", "transparent"],
                        help="Background color")
    parser.add_argument("--assets", help="Asset directory for image references")
    args = parser.parse_args()

    # Read input
    if args.input == "-" or args.input is None:
        data = json.load(sys.stdin)
    else:
        with open(args.input) as f:
            data = json.load(f)

    options = RenderOptions(
        output=args.output,
        scale=args.scale,
        background=args.bg,
        assets_dir=args.assets,
    )

    errors = render(data, options)

    if errors:
        json.dump(errors, sys.stderr, indent=2)
        sys.exit(1)


if __name__ == "__main__":
    main()
