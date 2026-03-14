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
