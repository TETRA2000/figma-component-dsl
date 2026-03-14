"""Tests for the DSL renderer."""
import json
import os
import tempfile
from pathlib import Path

import pytest

from figma_component_dsl.renderer import DslRenderer, RenderOptions


def make_frame_node(
    name="Frame",
    width=200,
    height=100,
    fills=None,
    children=None,
    **kwargs,
):
    """Helper to build a FigmaNodeDict for testing."""
    node = {
        "guid": kwargs.get("guid", [0, 0]),
        "type": kwargs.get("type", "FRAME"),
        "name": name,
        "size": {"x": width, "y": height},
        "transform": kwargs.get("transform", [[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
        "fillPaints": fills or [],
        "opacity": kwargs.get("opacity", 1.0),
        "visible": kwargs.get("visible", True),
        "children": children or [],
    }
    for k, v in kwargs.items():
        if k not in node:
            node[k] = v
    return node


def make_text_node(
    characters="Hello",
    font_size=14,
    x=0,
    y=0,
    width=60,
    height=17,
    **kwargs,
):
    """Helper to build a TEXT FigmaNodeDict."""
    return {
        "guid": kwargs.get("guid", [0, 1]),
        "type": "TEXT",
        "name": kwargs.get("name", "Text"),
        "size": {"x": width, "y": height},
        "transform": [[1, 0, x], [0, 1, y], [0, 0, 1]],
        "fillPaints": kwargs.get("fills", [{"type": "SOLID", "color": {"r": 0, "g": 0, "b": 0, "a": 1}}]),
        "opacity": 1.0,
        "visible": True,
        "children": [],
        "textData": {"characters": characters, "lines": characters.split("\n")},
        "derivedTextData": {
            "baselines": [
                {"lineY": i * font_size * 1.2, "lineHeight": font_size * 1.2, "firstCharIndex": 0, "endCharIndex": len(line)}
                for i, line in enumerate(characters.split("\n"))
            ],
            "fontMetaData": [{"fontFamily": "Inter", "fontStyle": "Regular", "fontWeight": 400, "fontSize": font_size}],
        },
        "fontSize": font_size,
        "fontFamily": "Inter",
        "textAlignHorizontal": kwargs.get("textAlignHorizontal", "LEFT"),
    }


class TestRendererBasic:
    """Test basic rendering operations."""

    def test_render_empty_frame(self, tmp_path):
        """Should render an empty frame and produce a PNG file."""
        renderer = DslRenderer()
        node = make_frame_node(width=200, height=100)
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()
        assert result.width == 200
        assert result.height == 100

    def test_render_frame_with_solid_fill(self, tmp_path):
        """Should render a frame with a red background."""
        renderer = DslRenderer()
        node = make_frame_node(
            width=100,
            height=50,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_invisible_node_skipped(self, tmp_path):
        """Invisible nodes should not be rendered."""
        renderer = DslRenderer()
        child = make_frame_node(
            name="Hidden",
            width=50,
            height=50,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
            visible=False,
            guid=[0, 1],
        )
        root = make_frame_node(width=100, height=100, children=[child])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_rectangle(self, tmp_path):
        """Should render a RECTANGLE node."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="RECTANGLE",
            width=80,
            height=40,
            fills=[{"type": "SOLID", "color": {"r": 0.0, "g": 0.0, "b": 1.0, "a": 1.0}}],
            cornerRadius=8,
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_ellipse(self, tmp_path):
        """Should render an ELLIPSE node."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="ELLIPSE",
            width=60,
            height=60,
            fills=[{"type": "SOLID", "color": {"r": 0.0, "g": 1.0, "b": 0.0, "a": 1.0}}],
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_non_circular_ellipse(self, tmp_path):
        """Should render an ellipse with different width and height."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="ELLIPSE",
            width=100,
            height=50,
            fills=[{"type": "SOLID", "color": {"r": 0.0, "g": 1.0, "b": 0.0, "a": 1.0}}],
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()
        assert result.width == 100
        assert result.height == 50

    def test_render_with_scale(self, tmp_path):
        """Should scale the output."""
        renderer = DslRenderer()
        node = make_frame_node(width=100, height=50)
        result = renderer.render(
            json.dumps(node),
            tmp_path / "out.png",
            RenderOptions(scale=2.0),
        )
        assert result.width == 200
        assert result.height == 100

    def test_render_opacity(self, tmp_path):
        """Should render a node with opacity."""
        renderer = DslRenderer()
        child = make_frame_node(
            name="SemiTransparent",
            width=50,
            height=50,
            opacity=0.5,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
            guid=[0, 1],
            transform=[[1, 0, 10], [0, 1, 10], [0, 0, 1]],
        )
        root = make_frame_node(width=100, height=100, children=[child])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()


class TestRendererText:
    """Test text rendering."""

    def test_render_text_node(self, tmp_path):
        """Should render a text node."""
        renderer = DslRenderer()
        text = make_text_node(characters="Hello World", font_size=16, width=120, height=20)
        root = make_frame_node(width=200, height=100, children=[text])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_multiline_text(self, tmp_path):
        """Should render multi-line text."""
        renderer = DslRenderer()
        text = make_text_node(characters="Line 1\nLine 2\nLine 3", font_size=14, width=100, height=50)
        root = make_frame_node(width=200, height=100, children=[text])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_text_with_letter_spacing(self, tmp_path):
        """Should render text with letter spacing and produce a PNG."""
        renderer = DslRenderer()
        text = make_text_node(characters="Spaced", font_size=16, width=200, height=30)
        text["letterSpacing"] = {"value": 5, "unit": "PERCENT"}
        root = make_frame_node(width=300, height=100, children=[text])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()
        assert result.png_path.stat().st_size > 0

    def test_render_text_italic(self, tmp_path):
        """Should render italic text and produce a PNG."""
        renderer = DslRenderer()
        text = make_text_node(characters="Italic text", font_size=16, width=120, height=20)
        text["derivedTextData"]["fontMetaData"][0]["fontStyle"] = "Italic"
        root = make_frame_node(width=200, height=100, children=[text])
        result = renderer.render(json.dumps(root), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()
        assert result.png_path.stat().st_size > 0


class TestRendererRotation:
    """Test rotation rendering."""

    def test_render_rotated_rectangle(self, tmp_path):
        """Should render a rotated rectangle and produce output that differs from non-rotated."""
        import math
        renderer = DslRenderer()

        # Non-rotated
        node_normal = make_frame_node(
            type="RECTANGLE",
            width=80,
            height=40,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
        )
        root_normal = make_frame_node(width=200, height=200, children=[node_normal])
        result_normal = renderer.render(json.dumps(root_normal), tmp_path / "normal.png", RenderOptions())

        # Rotated 45 degrees
        angle = math.radians(45)
        cos_a = math.cos(angle)
        sin_a = math.sin(angle)
        node_rotated = make_frame_node(
            type="RECTANGLE",
            width=80,
            height=40,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
            transform=[[cos_a, -sin_a, 60], [sin_a, cos_a, 60], [0, 0, 1]],
            guid=[0, 1],
        )
        root_rotated = make_frame_node(width=200, height=200, children=[node_rotated])
        result_rotated = renderer.render(json.dumps(root_rotated), tmp_path / "rotated.png", RenderOptions())

        assert result_normal.png_path.exists()
        assert result_rotated.png_path.exists()
        # Files should differ because of rotation
        normal_bytes = result_normal.png_path.read_bytes()
        rotated_bytes = result_rotated.png_path.read_bytes()
        assert normal_bytes != rotated_bytes


class TestRendererGradient:
    """Test gradient rendering."""

    def test_render_gradient_fill(self, tmp_path):
        """Should render a linear gradient fill."""
        import math
        cos0, sin0 = math.cos(0), math.sin(0)
        renderer = DslRenderer()
        node = make_frame_node(
            width=200,
            height=100,
            fills=[{
                "type": "GRADIENT_LINEAR",
                "gradientStops": [
                    {"color": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0}, "position": 0.0},
                    {"color": {"r": 0.0, "g": 0.0, "b": 1.0, "a": 1.0}, "position": 1.0},
                ],
                "gradientTransform": [[cos0, sin0, 0.5], [-sin0, cos0, 0.5]],
            }],
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()


class TestRendererPerCornerRadius:
    """Test per-corner radius rendering."""

    def test_render_mixed_corner_radii(self, tmp_path):
        """Should render a rectangle with different radii per corner."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="RECTANGLE",
            width=120,
            height=80,
            fills=[{"type": "SOLID", "color": {"r": 0.2, "g": 0.5, "b": 0.8, "a": 1.0}}],
            topLeftRadius=20,
            topRightRadius=0,
            bottomLeftRadius=0,
            bottomRightRadius=10,
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()
        assert result.width == 120
        assert result.height == 80

    def test_render_all_corners_different(self, tmp_path):
        """Should render with all four corners having different radii."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="FRAME",
            width=200,
            height=150,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 0.8, "b": 0.2, "a": 1.0}}],
            topLeftRadius=30,
            topRightRadius=15,
            bottomLeftRadius=5,
            bottomRightRadius=25,
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_uniform_corner_radius_fallback(self, tmp_path):
        """Should fall back to uniform cornerRadius when per-corner not set."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="RECTANGLE",
            width=100,
            height=60,
            fills=[{"type": "SOLID", "color": {"r": 0.0, "g": 0.8, "b": 0.4, "a": 1.0}}],
            cornerRadius=12,
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()

    def test_render_per_corner_with_stroke(self, tmp_path):
        """Should render per-corner radii with strokes."""
        renderer = DslRenderer()
        node = make_frame_node(
            type="RECTANGLE",
            width=100,
            height=60,
            fills=[{"type": "SOLID", "color": {"r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0}}],
            topLeftRadius=10,
            topRightRadius=10,
            bottomLeftRadius=0,
            bottomRightRadius=0,
            strokes=[{"type": "SOLID", "color": {"r": 0.0, "g": 0.0, "b": 0.0, "a": 1.0}}],
            strokeWeight=2,
        )
        result = renderer.render(json.dumps(node), tmp_path / "out.png", RenderOptions())
        assert result.png_path.exists()


class TestRendererCLI:
    """Test CLI entry point."""

    def test_cli_with_input_file(self, tmp_path):
        """Should accept --input and --output flags."""
        node = make_frame_node(width=100, height=50)
        input_path = tmp_path / "input.json"
        output_path = tmp_path / "output.png"
        input_path.write_text(json.dumps(node))

        exit_code = os.system(
            f"python3 -m figma_component_dsl --input {input_path} --output {output_path}"
        )
        assert exit_code == 0
        assert output_path.exists()

    def test_cli_with_stdin(self, tmp_path):
        """Should accept JSON from stdin."""
        node = make_frame_node(width=100, height=50)
        output_path = tmp_path / "output.png"

        exit_code = os.system(
            f"echo '{json.dumps(node)}' | python3 -m figma_component_dsl --output {output_path}"
        )
        assert exit_code == 0
        assert output_path.exists()


def _create_test_png(path: Path, width: int = 10, height: int = 10) -> None:
    """Create a small test PNG using cairo (red square)."""
    import cairo

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)
    ctx = cairo.Context(surface)
    ctx.set_source_rgba(1.0, 0.0, 0.0, 1.0)
    ctx.rectangle(0, 0, width, height)
    ctx.fill()
    surface.write_to_png(str(path))


class TestRendererImageFill:
    """Test IMAGE fill rendering."""

    def test_render_image_fill(self, tmp_path):
        """Should render a node with an IMAGE fill referencing an asset file."""
        # Create a test PNG asset
        asset_dir = tmp_path / "assets"
        asset_dir.mkdir()
        _create_test_png(asset_dir / "test_image.png", 20, 20)

        renderer = DslRenderer()
        node = make_frame_node(
            width=100,
            height=80,
            fills=[{"type": "IMAGE", "imageRef": "test_image.png"}],
        )
        options = RenderOptions(asset_dir=str(asset_dir))
        result = renderer.render(json.dumps(node), tmp_path / "out.png", options)

        assert result.png_path.exists()
        assert result.width == 100
        assert result.height == 80
        # Verify the output file has content (non-zero size)
        assert result.png_path.stat().st_size > 0

    def test_render_image_fill_missing_asset(self, tmp_path, capsys):
        """Should fall back gracefully when the asset file is missing."""
        asset_dir = tmp_path / "assets"
        asset_dir.mkdir()

        renderer = DslRenderer()
        node = make_frame_node(
            width=100,
            height=80,
            fills=[{"type": "IMAGE", "imageRef": "nonexistent.png"}],
        )
        options = RenderOptions(asset_dir=str(asset_dir))
        result = renderer.render(json.dumps(node), tmp_path / "out.png", options)

        assert result.png_path.exists()
        assert result.width == 100
        assert result.height == 80
        # Should have printed a warning to stderr
        captured = capsys.readouterr()
        assert "nonexistent.png" in captured.err

    def test_render_image_fill_no_asset_dir(self, tmp_path, capsys):
        """Should fall back gracefully when no asset_dir is configured."""
        renderer = DslRenderer()
        node = make_frame_node(
            width=100,
            height=80,
            fills=[{"type": "IMAGE", "imageRef": "some_image.png"}],
        )
        options = RenderOptions(asset_dir=None)
        result = renderer.render(json.dumps(node), tmp_path / "out.png", options)

        assert result.png_path.exists()
        captured = capsys.readouterr()
        assert "some_image.png" in captured.err

    def test_render_image_fill_scales_to_node(self, tmp_path):
        """IMAGE fill should be scaled to fill the node bounds."""
        asset_dir = tmp_path / "assets"
        asset_dir.mkdir()
        # Create a small 10x10 image, render into a 100x80 node
        _create_test_png(asset_dir / "small.png", 10, 10)

        renderer = DslRenderer()
        node = make_frame_node(
            width=100,
            height=80,
            fills=[{"type": "IMAGE", "imageRef": "small.png"}],
        )
        options = RenderOptions(asset_dir=str(asset_dir))
        result = renderer.render(json.dumps(node), tmp_path / "out.png", options)

        assert result.png_path.exists()
        assert result.width == 100
        assert result.height == 80
