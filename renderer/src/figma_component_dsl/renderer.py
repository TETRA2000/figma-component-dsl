"""PyCairo renderer for FigmaNodeDict JSON."""
from __future__ import annotations

import json
import math
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import cairo


@dataclass
class RenderOptions:
    background_color: tuple[float, float, float, float] = (1.0, 1.0, 1.0, 1.0)
    scale: float = 1.0
    asset_dir: str | None = None


@dataclass
class RenderResult:
    png_path: Path
    width: int
    height: int


class DslRenderer:
    """Renders FigmaNodeDict JSON to PNG via PyCairo."""

    def render(
        self,
        node_json: str,
        output_path: Path | str,
        options: RenderOptions,
    ) -> RenderResult:
        output_path = Path(output_path)
        node = json.loads(node_json)

        width = int(node["size"]["x"] * options.scale)
        height = int(node["size"]["y"] * options.scale)
        width = max(width, 1)
        height = max(height, 1)

        surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)
        ctx = cairo.Context(surface)

        # Background
        r, g, b, a = options.background_color
        ctx.set_source_rgba(r, g, b, a)
        ctx.paint()

        # Apply scale
        if options.scale != 1.0:
            ctx.scale(options.scale, options.scale)

        self._render_node(ctx, node, options)

        surface.write_to_png(str(output_path))
        return RenderResult(png_path=output_path, width=width, height=height)

    def _render_node(
        self,
        ctx: cairo.Context,
        node: dict[str, Any],
        options: RenderOptions,
    ) -> None:
        if not node.get("visible", True):
            return

        node_type = node.get("type", "")
        ctx.save()

        # Apply transform
        transform = node.get("transform")
        if transform:
            tx = transform[0][2]
            ty = transform[1][2]
            ctx.translate(tx, ty)

        opacity = node.get("opacity", 1.0)

        # Clip content
        clip = node.get("clipContent", False)
        w = node["size"]["x"]
        h = node["size"]["y"]

        if clip:
            ctx.rectangle(0, 0, w, h)
            ctx.clip()

        if node_type == "TEXT":
            self._render_text(ctx, node, opacity)
        elif node_type == "ELLIPSE":
            self._render_ellipse(ctx, node, opacity)
        else:
            self._render_rect_like(ctx, node, opacity, options)

        # Render children
        for child in node.get("children", []):
            self._render_node(ctx, child, options)

        ctx.restore()

    def _get_corner_radii(
        self,
        node: dict[str, Any],
    ) -> tuple[float, float, float, float] | None:
        """Extract per-corner radii from node, returning None if not set."""
        tl = node.get("topLeftRadius")
        tr = node.get("topRightRadius")
        bl = node.get("bottomLeftRadius")
        br = node.get("bottomRightRadius")
        if tl is not None or tr is not None or bl is not None or br is not None:
            return (
                tl if tl is not None else 0,
                tr if tr is not None else 0,
                bl if bl is not None else 0,
                br if br is not None else 0,
            )
        return None

    def _render_rect_like(
        self,
        ctx: cairo.Context,
        node: dict[str, Any],
        opacity: float,
        options: RenderOptions | None = None,
    ) -> None:
        w = node["size"]["x"]
        h = node["size"]["y"]
        corner_radius = node.get("cornerRadius", 0)
        per_corner = self._get_corner_radii(node)

        # Fills
        for paint in node.get("fillPaints", []):
            if paint.get("type") == "SOLID":
                self._apply_solid_fill(ctx, paint, w, h, corner_radius, opacity, per_corner)
            elif paint.get("type") == "GRADIENT_LINEAR":
                self._apply_gradient_fill(ctx, paint, w, h, corner_radius, opacity, per_corner)
            elif paint.get("type") == "IMAGE":
                self._apply_image_fill(ctx, paint, w, h, corner_radius, opacity, options)

        # Strokes
        stroke_weight = node.get("strokeWeight", 0)
        for stroke in node.get("strokes", []):
            if stroke.get("type") == "SOLID" and stroke_weight > 0:
                color = stroke["color"]
                paint_opacity = stroke.get("opacity", 1.0) * opacity
                ctx.set_source_rgba(color["r"], color["g"], color["b"], paint_opacity)
                self._make_rect_path(ctx, w, h, corner_radius, per_corner)
                ctx.set_line_width(stroke_weight)
                ctx.stroke()

    def _make_rect_path(
        self,
        ctx: cairo.Context,
        w: float,
        h: float,
        corner_radius: float,
        per_corner: tuple[float, float, float, float] | None = None,
    ) -> None:
        """Build rect path using per-corner radii if available, else uniform."""
        if per_corner is not None:
            self._rect_path_per_corner(ctx, w, h, per_corner)
        else:
            self._rect_path(ctx, w, h, corner_radius)

    def _apply_solid_fill(
        self,
        ctx: cairo.Context,
        paint: dict[str, Any],
        w: float,
        h: float,
        corner_radius: float,
        opacity: float,
        per_corner: tuple[float, float, float, float] | None = None,
    ) -> None:
        color = paint["color"]
        paint_opacity = paint.get("opacity", 1.0) * opacity
        ctx.set_source_rgba(color["r"], color["g"], color["b"], paint_opacity)
        self._make_rect_path(ctx, w, h, corner_radius, per_corner)
        ctx.fill()

    def _apply_gradient_fill(
        self,
        ctx: cairo.Context,
        paint: dict[str, Any],
        w: float,
        h: float,
        corner_radius: float,
        opacity: float,
        per_corner: tuple[float, float, float, float] | None = None,
    ) -> None:
        gt = paint.get("gradientTransform", [[1, 0, 0.5], [0, 1, 0.5]])
        # Convert Figma gradient transform to Cairo linear gradient coordinates
        # Figma transform: [[cos, sin, tx], [-sin, cos, ty]]
        cos_a = gt[0][0]
        sin_a = gt[0][1]

        # Start and end points in normalized coordinates
        cx, cy = 0.5, 0.5
        dx = cos_a * 0.5
        dy = sin_a * 0.5

        x0 = (cx - dx) * w
        y0 = (cy - dy) * h
        x1 = (cx + dx) * w
        y1 = (cy + dy) * h

        gradient = cairo.LinearGradient(x0, y0, x1, y1)
        for stop in paint.get("gradientStops", []):
            color = stop["color"]
            a = color.get("a", 1.0) * paint.get("opacity", 1.0) * opacity
            gradient.add_color_stop_rgba(stop["position"], color["r"], color["g"], color["b"], a)

        ctx.set_source(gradient)
        self._make_rect_path(ctx, w, h, corner_radius, per_corner)
        ctx.fill()

    def _apply_image_fill(
        self,
        ctx: cairo.Context,
        paint: dict[str, Any],
        w: float,
        h: float,
        corner_radius: float,
        opacity: float,
        options: RenderOptions | None = None,
        per_corner: tuple[float, float, float, float] | None = None,
    ) -> None:
        image_ref = paint.get("imageRef", "")
        asset_dir = options.asset_dir if options else None

        # Resolve asset path
        if not asset_dir:
            print(f"Warning: IMAGE fill references '{image_ref}' but no asset_dir configured", file=sys.stderr)
            self._render_placeholder(ctx, w, h, corner_radius, opacity)
            return

        asset_path = Path(asset_dir) / image_ref
        if not asset_path.exists():
            print(f"Warning: IMAGE asset not found: {asset_path} (imageRef='{image_ref}')", file=sys.stderr)
            self._render_placeholder(ctx, w, h, corner_radius, opacity)
            return

        try:
            img_surface = cairo.ImageSurface.create_from_png(str(asset_path))
        except Exception as e:
            print(f"Warning: Failed to load image '{image_ref}': {e}", file=sys.stderr)
            self._render_placeholder(ctx, w, h, corner_radius, opacity)
            return

        img_w = img_surface.get_width()
        img_h = img_surface.get_height()

        # Scale image to fill node bounds
        scale_x = w / img_w if img_w > 0 else 1.0
        scale_y = h / img_h if img_h > 0 else 1.0

        ctx.save()
        # Clip to node shape
        self._make_rect_path(ctx, w, h, corner_radius, per_corner)
        ctx.clip()

        # Set up scaled image pattern
        pattern = cairo.SurfacePattern(img_surface)
        pattern.set_filter(cairo.FILTER_BILINEAR)
        # Pattern matrix maps from user space to pattern space (inverse of desired transform)
        matrix = cairo.Matrix()
        matrix.scale(1.0 / scale_x, 1.0 / scale_y)
        pattern.set_matrix(matrix)

        ctx.set_source(pattern)
        paint_opacity = paint.get("opacity", 1.0) * opacity
        if paint_opacity < 1.0:
            ctx.paint_with_alpha(paint_opacity)
        else:
            ctx.paint()

        ctx.restore()

    def _render_placeholder(
        self,
        ctx: cairo.Context,
        w: float,
        h: float,
        corner_radius: float,
        opacity: float,
    ) -> None:
        """Render a gray placeholder rectangle for missing images."""
        ctx.set_source_rgba(0.8, 0.8, 0.8, opacity)
        self._rect_path(ctx, w, h, corner_radius)
        ctx.fill()

    def _render_ellipse(
        self,
        ctx: cairo.Context,
        node: dict[str, Any],
        opacity: float,
    ) -> None:
        w = node["size"]["x"]
        h = node["size"]["y"]
        rx = w / 2
        ry = h / 2

        for paint in node.get("fillPaints", []):
            if paint.get("type") == "SOLID":
                color = paint["color"]
                paint_opacity = paint.get("opacity", 1.0) * opacity
                ctx.set_source_rgba(color["r"], color["g"], color["b"], paint_opacity)
                ctx.save()
                ctx.translate(rx, ry)
                ctx.scale(rx, ry)
                ctx.arc(0, 0, 1, 0, 2 * math.pi)
                ctx.restore()
                ctx.fill()

    def _render_text(
        self,
        ctx: cairo.Context,
        node: dict[str, Any],
        opacity: float,
    ) -> None:
        text_data = node.get("textData", {})
        derived = node.get("derivedTextData", {})
        lines = text_data.get("lines", [])
        baselines = derived.get("baselines", [])
        font_meta = derived.get("fontMetaData", [{}])

        if not lines:
            return

        meta = font_meta[0] if font_meta else {}
        font_family = meta.get("fontFamily", "sans-serif")
        font_weight = meta.get("fontWeight", 400)
        font_size = meta.get("fontSize", 12)

        # Map weight to Cairo
        cairo_weight = cairo.FONT_WEIGHT_BOLD if font_weight >= 500 else cairo.FONT_WEIGHT_NORMAL
        ctx.select_font_face(font_family, cairo.FONT_SLANT_NORMAL, cairo_weight)
        ctx.set_font_size(font_size)

        # Text color from first fill
        fills = node.get("fillPaints", [])
        if fills and fills[0].get("type") == "SOLID":
            color = fills[0]["color"]
            ctx.set_source_rgba(color["r"], color["g"], color["b"], opacity)
        else:
            ctx.set_source_rgba(0, 0, 0, opacity)

        align = node.get("textAlignHorizontal", "LEFT")
        w = node["size"]["x"]

        for i, line in enumerate(lines):
            if i < len(baselines):
                baseline = baselines[i]
                line_y = baseline["lineY"] + baseline["lineHeight"] * 0.8  # Approximate baseline
            else:
                line_y = i * font_size * 1.2 + font_size

            # Alignment offset
            x_offset = 0.0
            if align in ("CENTER", "RIGHT"):
                extents = ctx.text_extents(line)
                text_w = extents.x_advance
                if align == "CENTER":
                    x_offset = (w - text_w) / 2
                elif align == "RIGHT":
                    x_offset = w - text_w

            ctx.move_to(x_offset, line_y)
            ctx.show_text(line)

    def _rect_path_per_corner(
        self,
        ctx: cairo.Context,
        w: float,
        h: float,
        radii: tuple[float, float, float, float],
    ) -> None:
        """Draw a rectangle path with different radius per corner (TL, TR, BL, BR)."""
        tl, tr, bl, br = radii
        tl = min(tl, w / 2, h / 2)
        tr = min(tr, w / 2, h / 2)
        bl = min(bl, w / 2, h / 2)
        br = min(br, w / 2, h / 2)
        ctx.new_path()
        if tl > 0:
            ctx.arc(tl, tl, tl, math.pi, 1.5 * math.pi)
        else:
            ctx.move_to(0, 0)
        if tr > 0:
            ctx.arc(w - tr, tr, tr, 1.5 * math.pi, 2 * math.pi)
        else:
            ctx.line_to(w, 0)
        if br > 0:
            ctx.arc(w - br, h - br, br, 0, 0.5 * math.pi)
        else:
            ctx.line_to(w, h)
        if bl > 0:
            ctx.arc(bl, h - bl, bl, 0.5 * math.pi, math.pi)
        else:
            ctx.line_to(0, h)
        ctx.close_path()

    def _rect_path(
        self,
        ctx: cairo.Context,
        w: float,
        h: float,
        radius: float,
    ) -> None:
        if radius <= 0:
            ctx.rectangle(0, 0, w, h)
        else:
            r = min(radius, w / 2, h / 2)
            ctx.new_path()
            ctx.arc(r, r, r, math.pi, 1.5 * math.pi)
            ctx.arc(w - r, r, r, 1.5 * math.pi, 2 * math.pi)
            ctx.arc(w - r, h - r, r, 0, 0.5 * math.pi)
            ctx.arc(r, h - r, r, 0.5 * math.pi, math.pi)
            ctx.close_path()


def main() -> None:
    """CLI entry point for the renderer."""
    import argparse

    parser = argparse.ArgumentParser(description="Render FigmaNodeDict JSON to PNG")
    parser.add_argument("--input", type=str, help="Input JSON file path (default: stdin)")
    parser.add_argument("--output", type=str, required=True, help="Output PNG file path")
    parser.add_argument("--scale", type=float, default=1.0, help="Scale factor (default: 1.0)")
    parser.add_argument("--bg", type=str, default="white", choices=["white", "transparent"],
                        help="Background color")
    parser.add_argument("--assets", type=str, default=None, help="Asset directory")

    args = parser.parse_args()

    # Read input
    if args.input:
        node_json = Path(args.input).read_text()
    else:
        node_json = sys.stdin.read()

    # Background
    bg = (1.0, 1.0, 1.0, 1.0) if args.bg == "white" else (0.0, 0.0, 0.0, 0.0)

    options = RenderOptions(
        background_color=bg,
        scale=args.scale,
        asset_dir=args.assets,
    )

    try:
        renderer = DslRenderer()
        result = renderer.render(node_json, Path(args.output), options)
    except Exception as e:
        error = {"error": str(e), "type": type(e).__name__}
        print(json.dumps(error), file=sys.stderr)
        sys.exit(2)
